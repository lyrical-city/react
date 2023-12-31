import { ControlledElement } from './core';
import { DirectiveOptions, DirectiveProps } from './typings';
export * from './typings';

/**
 * 指令元素
 */
export class DirectiveElement<EP> {
  private options: DirectiveOptions<Omit<EP, keyof DirectiveProps>, any>;

  constructor(options: DirectiveOptions<Omit<EP, keyof DirectiveProps>, any> = {}) {
    this.options = options;
  }

  /**
   * 打开
   * @param element 元素
   * @param props 参数
   * @param options 选项
   */
  open<P = EP, R = void>(
    element: React.FC<P & DirectiveProps<R>>,
    props: Omit<P, keyof DirectiveProps<R>>,
    options: DirectiveOptions<Omit<P, keyof DirectiveProps>, R> = {}
  ) {
    const _options = this.options as unknown as DirectiveOptions<Omit<P, keyof DirectiveProps>, R>;
    const e = new ControlledElement<P, R>(element, {
      ..._options,
      ...options,
      transformProps: _props => {
        if (_options.transformProps) {
          Object.assign(_props, _options.transformProps({ ..._props }));
        }

        if (options.transformProps) {
          Object.assign(_props, options.transformProps({ ..._props }));
        }

        return _props;
      }
    });

    e.open(props);

    return e as Omit<typeof e, 'open' | 'on'>;
  }
}

/**
 * react 指令
 */
export const reactDirective = new DirectiveElement();
