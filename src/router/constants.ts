import { lazy } from 'react';
import { ROUTE_MAP } from './enum';

export const routes = [
  {
    title: '首页',
    name: ROUTE_MAP.app,
    path: '/',
    component: lazy(() => import('../pages/App')),
    defaultChildPath: true,
    children: [
      {
        title: '加载 Loading',
        name: ROUTE_MAP.loading,
        path: '/loading',
        component: lazy(() => import('../views/App/Loading')),
        children: []
      },
      {
        title: '过度 Transition',
        name: ROUTE_MAP.transition,
        path: '/transition',
        component: lazy(() => import('../views/App/Transition')),
        children: []
      },
      {
        title: '开关 Switch',
        name: ROUTE_MAP.switch,
        path: '/switch',
        component: lazy(() => import('../views/App/Switch')),
        children: []
      },
      {
        title: '单选框 Radio',
        name: ROUTE_MAP.radio,
        path: '/radio',
        component: lazy(() => import('../views/App/Radio')),
        children: []
      },
      {
        title: '多选框 Checkbox',
        name: ROUTE_MAP.checkbox,
        path: '/checkbox',
        component: lazy(() => import('../views/App/Checkbox')),
        children: []
      },
      {
        title: '输入框 Input',
        name: ROUTE_MAP.input,
        path: '/input',
        component: lazy(() => import('../views/App/Input')),
        children: []
      },
      {
        title: '按钮 Button',
        name: ROUTE_MAP.button,
        path: '/button',
        component: lazy(() => import('../views/App/Button')),
        children: []
      },
      {
        title: '弹窗 Modal',
        name: ROUTE_MAP.modal,
        path: '/modal',
        component: lazy(() => import('../views/App/Modal')),
        children: []
      },
      {
        title: '全局提示 Message',
        name: ROUTE_MAP.message,
        path: '/message',
        component: lazy(() => import('../views/App/Message')),
        children: []
      }
    ]
  }
];
