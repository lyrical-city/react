/**
 * 路由
 */
export interface IRoute<Name = string> {
  /**
   * 名称
   */
  name: Name;
  /**
   * 标题
   */
  title?: string;
  /**
   * 路径
   */
  path: string;
  /**
   * 组件
   */
  component: React.FC;
  /**
   * 默认子路径
   * @default true
   */
  defaultChildPath?: string | boolean;
  /**
   * 子组件列表
   */
  children?: Array<IRoute<Name>>;
}
