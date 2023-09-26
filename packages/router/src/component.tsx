import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { IRoute } from './types';

const Component = ({ route }: { route: IRoute }) => {
  if (route.title) document.title = route.title;
  return <route.component />;
};

/**
 * 路由器核心
 */
const RouterCore = (routes: Array<IRoute>, loader?: React.ReactNode) => {
  return routes.map(({ defaultChildPath = true, ...route }) => {
    return (
      <Route
        path={route.path}
        key={route.path}
        element={
          <Suspense fallback={loader || 'loading...'}>
            <Component route={route} />
          </Suspense>
        }
      >
        {route.children?.length ? RouterCore(route.children, loader) : undefined}
        {route.children?.length ? (
          defaultChildPath === true ? (
            <Route path={route.path} element={<Navigate to={route.children[0].path} />} />
          ) : defaultChildPath ? (
            <Route
              path={route.path}
              element={<Navigate to={route.children.find(c => c.path === defaultChildPath)?.path || route.path} />}
            />
          ) : null
        ) : null}
      </Route>
    );
  });
};

/**
 * 路由器视图
 */
export const RouterView = (props: { routes: Array<IRoute>; loader?: React.ReactNode }) => {
  return <Routes>{RouterCore(props.routes, props.loader)}</Routes>;
};
