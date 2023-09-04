/**
 * 指令参数
 */
export interface DirectiveProps<Result = void> {
  /**
   * 是否可见
   */
  visible: boolean;
  /**
   * 隐藏
   */
  hidden: (result?: Result) => void;
  /**
   * 事件
   */
  event: {
    emit: (key: keyof DirectiveOptions['cycle']) => void;
    on: (cycle: Exclude<DirectiveOptions['cycle'], undefined>) => void;
  };
  /**
   * 选项
   */
  options: Pick<DirectiveOptions, 'hiddenTimeout'>;
}

/**
 * 指令周期
 */
export interface DirectiveCycle {
  /**
   * 显示前
   */
  onBeforeOpen?: (element: HTMLElement) => void;
  /**
   * 显示后
   */
  onAfterOpen?: (element: HTMLElement) => void;
  /**
   * 隐藏前
   */
  onBeforeClose?: (element: HTMLElement) => void;
  /**
   * 隐藏后
   */
  onAfterClose?: (element: HTMLElement) => void;
}

/**
 * 指令选项
 */
export interface DirectiveOptions<T = Record<string, any>, Result = void> {
  /**
   * 根 DOM
   * @default document.body
   */
  root?: HTMLElement;

  /**
   * 是否存活
   * @default false
   */
  isAlive?: boolean;

  /**
   * 参数
   */
  props?: T;

  /**
   * 转换参数
   */
  transformProps?: (props: T & DirectiveProps<Result>) => Partial<T & DirectiveProps<Result>>;

  /**
   * 关闭延时 配合动效
   */
  hiddenTimeout?: number;

  /**
   * 生命周期
   */
  cycle?: DirectiveCycle;
}
