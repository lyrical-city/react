import { NavigateFunction, NavigateOptions } from 'react-router-dom';
import { IRoute } from './types';

export * from './types';
export * from './component';

interface RouterParameters<Enum, M> {
  map: M;
  routes: Array<IRoute<Enum>>;
}

/**
 * 路由器
 */
export class Router<Enum, M> {
  /**
   * 地图
   */
  private map: M;

  /**
   * 路由列表
   */
  routes: Array<IRoute<Enum>>;

  constructor(parameters: RouterParameters<Enum, M>) {
    this.map = parameters.map;
    this.routes = parameters.routes;
  }

  /**
   * 初始化导航
   */
  initNavigate(navigate: NavigateFunction) {
    (window as any).navigate = navigate;
  }

  /**
   * 校验是否初始化的
   */
  private verifyInitialized() {
    if (!(window as any).navigate)
      throw new Error(`Router: navigate 未初始化，请调用 router.initNavigate 进行初始化！`);
  }

  /**
   * 获取路由
   */
  getRoute(map: Enum | ((map: M) => Enum), routes = this.routes): IRoute<Enum> | undefined {
    this.verifyInitialized();
    const name = typeof map === 'function' ? (map as Function)(this.map) : map;
    for (const route of routes) {
      if (route.name === name) return route;
      if (route.children?.length) {
        const r = this.getRoute(name, route.children);
        if (r) return r;
      }
    }
    return;
  }

  /**
   * 跳转路由
   */
  go(map: Enum | ((map: M) => Enum), options?: NavigateOptions & { params?: Record<string, string> }) {
    this.verifyInitialized();
    const name = typeof map === 'function' ? (map as Function)(this.map) : map;
    const route = this.getRoute(name);
    if (!route) throw new Error(`Router: ${name} 路由未找到！`);

    let { path } = route;

    if (options?.params) {
      for (const key of Object.keys(options.params)) {
        const value = options.params[key];
        path = path.replace(`:${key}`, value);
      }
    }

    (window as any).navigate(path, options);
  }
}
