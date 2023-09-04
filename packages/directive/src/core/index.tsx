import { LifeCycle } from '@logically/coding-model';
import { DirectiveCycle, DirectiveOptions, DirectiveProps } from '../typings';
import { createReactDirectiveCore } from './react';

export class ControlledElement<T, Result = void> {
  private core: ReturnType<typeof createReactDirectiveCore>;

  private options: DirectiveOptions<Omit<T, keyof DirectiveProps>, Result>;

  private mounted = false;

  /**
   * 异步 Promise
   */
  promise!: Promise<Result | undefined>;

  private resolve?: (value: Result | undefined | PromiseLike<Result | undefined>) => void;

  private cycle = new LifeCycle<DirectiveCycle>();

  constructor(
    element: React.FC<T & DirectiveProps<Result>>,
    options: DirectiveOptions<Omit<T, keyof DirectiveProps>, Result> = {}
  ) {
    this.core = createReactDirectiveCore(element);

    if (options.cycle) this.cycle.on(options.cycle);

    this.options = options;

    this.promise = new Promise<Result | undefined>(r => {
      this.resolve = r;
    });
  }

  on(cycle: DirectiveCycle) {
    this.cycle.on(cycle);
  }

  private async emit(cycleKey: keyof DirectiveCycle) {
    this.cycle.emit(cycleKey, this.core.mountElement.element);
  }

  private resolvePromise(result?: Result) {
    this.resolve?.(result);

    this.promise = new Promise<Result | undefined>(r => {
      this.resolve = r;
    });

    this.resolve = undefined;

    this.emit('onAfterClose');
  }

  open(props: Omit<T, keyof DirectiveProps>) {
    if (this.options.isAlive && this.mounted) {
      this.emit('onBeforeOpen');

      this.core.mountComponent.show();

      this.emit('onAfterOpen');

      return this.promise;
    }

    this.mounted = true;

    this.emit('onBeforeOpen');

    this.core.mountElement.mount(this.options.root || document.body).show();

    let defaultProps = {
      ...props,

      hidden: (result?: Result) => {
        this.close(result);
      },

      visible: true,

      event: {
        emit: this.emit.bind(this),
        on: this.on.bind(this)
      },

      options: {
        hiddenTimeout: this.options.hiddenTimeout
      }
    };

    if (this.options.transformProps) defaultProps = { ...defaultProps, ...this.options.transformProps(defaultProps) };

    this.core.mountComponent.mount(this.core.mountElement.element, defaultProps).show();

    this.emit('onAfterOpen');

    return this.promise;
  }

  /**
   * 关闭
   * @param result 返回值
   */
  close(result?: Result) {
    if (!this.mounted) {
      this.emit('onBeforeClose');

      this.resolvePromise(result);

      return;
    }

    if (this.options.isAlive) {
      if (!this.options.hiddenTimeout) {
        this.emit('onBeforeClose');

        this.core.mountComponent.hide();

        this.resolvePromise(result);

        return;
      }

      this.emit('onBeforeClose');

      setTimeout(() => {
        this.core.mountComponent.hide();

        this.resolvePromise(result);
      }, this.options.hiddenTimeout);

      return;
    }

    this.mounted = false;

    this.core.mountComponent.hide();

    if (!this.options.hiddenTimeout) {
      this.emit('onBeforeClose');

      this.core.mountComponent.unMount(this.core.mountElement.element);

      this.core.mountElement.hide().unMount();

      this.resolvePromise(result);

      return;
    }

    this.emit('onBeforeClose');

    setTimeout(() => {
      this.core.mountComponent.unMount(this.core.mountElement.element);

      this.core.mountElement.hide().unMount();

      this.resolvePromise(result);
    }, this.options.hiddenTimeout);
  }
}
