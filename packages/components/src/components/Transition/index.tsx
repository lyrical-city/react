import React from 'react';
import { findDOMNode } from 'react-dom';

enum TRANSITION_STATUS {
  /**
   * 进入-开始
   */
  ENTER_START = 'enter-start',
  /**
   * 进入-进行中
   */
  ENTER_PROGRESS = 'enter-progress',
  /**
   * 进入-结束
   */
  ENTER_END = 'enter-end',
  /**
   * 退出-开始
   */
  EXIT_START = 'exit-start',
  /**
   * 进入-进行中
   */
  EXIT_PROGRESS = 'exit-progress',
  /**
   * 退出-结束
   */
  EXIT_END = 'exit-end',
  /**
   * 未挂载
   */
  UNMOUNTED = 'unmounted'
}

interface ICycleParams<T extends Record<string, any>> {
  node: HTMLElement | null;
  space: T;
  props: TransitionProps<T>;
  mount?: boolean;
}

/**
 * 过度参数
 */
export interface TransitionProps<T extends Record<string, any> = Record<string, any>> {
  /**
   * 子元素
   */
  children: React.ReactElement;
  /**
   * 名称
   */
  name: string;
  /**
   * 控制组件显示隐藏
   * @default true
   */
  show?: boolean;
  /**
   * 是否展示初始挂载进入动画
   * @default false
   */
  initTransition?: boolean;
  /**
   * 退出后是否卸载元素
   * @default false
   */
  unmountOnExit?: boolean;
  /**
   * 动画延时
   * @default 300
   */
  timeout?: {
    enter?: number;
    exit?: number;
  };
  /**
   * 初始数据空间
   */
  space?: T;
  /**
   * 周期
   */
  cycles?: {
    /**
     * 进入
     */
    enter?: {
      /**
       * 开始
       */
      start?: (params: ICycleParams<T>) => void;
      /**
       * 进行中
       */
      progress?: (params: ICycleParams<T>) => void;
      /**
       * 结束
       */
      end?: (params: ICycleParams<T>) => void;
    };
    /**
     * 离开
     */
    exit?: {
      /**
       * 开始
       */
      start?: (params: ICycleParams<T>) => void;
      /**
       * 进行中
       */
      progress?: (params: ICycleParams<T>) => void;
      /**
       * 结束
       */
      end?: (params: ICycleParams<T>) => void;
    };
  };
}

/**
 * 过度
 */
export class Transition<T extends Record<string, any> = Record<string, any>> extends React.Component<
  TransitionProps<T>
> {
  static defaultProps = {
    show: true,
    timeout: {
      enter: 300,
      exit: 300
    },
    unmountOnExit: false,
    initTransition: false,
    space: {}
  };

  state = {
    status: TRANSITION_STATUS.UNMOUNTED
  };

  componentDidMount() {
    if (this.props.initTransition) {
      this.setState({ status: TRANSITION_STATUS.ENTER_END }, () => {
        if (this.props.show) this.performEnter();
        else this.performExit();
      });
    } else {
      if (this.props.show) this.setState({ status: TRANSITION_STATUS.ENTER_START }, () => this.onEntered(true));
      else {
        // if (!this.props.unmountOnExit) {
        //   this.setState({ status: TRANSITION_STATUS.EXIT_START }, () => this.onExited());
        // }
      }
    }
  }

  componentDidUpdate(prevProps: TransitionProps<T>) {
    if (prevProps !== this.props) {
      if (prevProps.show === this.props.show) return;
      const { status } = this.state;

      if (this.props.show) {
        if (
          status !== TRANSITION_STATUS.ENTER_START &&
          status !== TRANSITION_STATUS.ENTER_PROGRESS &&
          status !== TRANSITION_STATUS.ENTER_END
        ) {
          if (this.props.unmountOnExit)
            this.setState({ status: TRANSITION_STATUS.ENTER_END }, () => this.performEnter());
          else this.performEnter();
        }
      } else {
        if (
          status === TRANSITION_STATUS.ENTER_START ||
          status === TRANSITION_STATUS.ENTER_PROGRESS ||
          status === TRANSITION_STATUS.ENTER_END ||
          (this.props.unmountOnExit && status === TRANSITION_STATUS.UNMOUNTED)
        ) {
          this.performExit();
        }
      }
    }
  }

  space: T = this.props.space as T;

  get node() {
    // eslint-disable-next-line react/no-find-dom-node
    return findDOMNode(this) as HTMLElement | null;
  }

  get params() {
    return { node: this.node, space: this.space, props: this.props };
  }

  onEnterStart() {
    this.setState({ status: TRANSITION_STATUS.ENTER_START });
    this.props.cycles?.enter?.start?.(this.params);
  }

  onEnterProgress() {
    this.setState({ status: TRANSITION_STATUS.ENTER_PROGRESS });
    this.props.cycles?.enter?.progress?.(this.params);
  }

  onEntered(mount = false) {
    this.setState({ status: TRANSITION_STATUS.ENTER_END });
    this.props.cycles?.enter?.end?.({ ...this.params, mount });
  }

  onExitStart() {
    this.setState({ status: TRANSITION_STATUS.EXIT_START });
    this.props.cycles?.exit?.start?.(this.params);
  }

  onExitProgress() {
    this.setState({ status: TRANSITION_STATUS.EXIT_PROGRESS });
    this.props.cycles?.exit?.progress?.(this.params);
  }

  onExited() {
    this.props.cycles?.exit?.end?.(this.params);
    this.setState({ status: this.props.unmountOnExit ? TRANSITION_STATUS.UNMOUNTED : TRANSITION_STATUS.EXIT_END });
  }

  performEnter() {
    this.setState({ status: TRANSITION_STATUS.ENTER_START });
    window.requestAnimationFrame(() => {
      this.onEnterStart();

      window.requestAnimationFrame(() => {
        this.onEnterProgress();
        setTimeout(() => this.onEntered(), this.props.timeout?.enter || 300);
      });
    });
  }

  performExit() {
    this.setState({ status: TRANSITION_STATUS.EXIT_START });
    setTimeout(() => {
      this.onExitStart();

      setTimeout(() => {
        this.onExitProgress();
        setTimeout(() => this.onExited(), this.props.timeout?.enter || 300);
      }, 10);
    }, 10);
  }

  render() {
    if (!this.props.children) return null;
    if (this.state.status === TRANSITION_STATUS.UNMOUNTED) return null;

    return React.cloneElement(React.Children.only(this.props.children));
  }
}

export default Transition;
