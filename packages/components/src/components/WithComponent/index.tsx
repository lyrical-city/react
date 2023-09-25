import React from 'react';

/**
 * 预设组件参数
 */
export interface IWithComponentProps<T, D extends Partial<T>> {
  /**
   * 预设组件
   */
  Component: React.FC<T>;
  /**
   * 预设参数
   */
  defaultProps: D;
}

/**
 * 预设组件
 */
export const WithComponent = function <T, D extends Partial<T>>(props: IWithComponentProps<T, D>): React.FC<T> {
  const { Component, defaultProps } = props;

  return (props: T) => <Component {...{ ...defaultProps, ...props }} />;
};

export default WithComponent;
