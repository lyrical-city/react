import React from 'react';

/**
 * 骨架屏参数
 */
interface ISkeletonProps {
  /**
   * 是否动态的
   */
  active?: boolean;
  /**
   * 是否块级元素
   */
  block?: boolean;
  /**
   * 宽度
   */
  width?: number | string;
  /**
   * 高度
   */
  height?: number;
  /**
   * 样式
   */
  style?: React.CSSProperties;
  /**
   * 背景色
   */
  backgroundColor?: string;
  /**
   * 动态颜色
   */
  activeColor?: string;
}

/**
 * 骨架屏
 */
export const Skeleton = ({
  active = false,
  block = false,
  width = 'inherit',
  height = 32,
  backgroundColor = 'rgba(190,190,190,.2)',
  activeColor = 'rgba(129,129,129,.24)',
  style = {}
}: ISkeletonProps) => (
  <div
    className={`lyric-skeleton${active ? ' active' : ''}${block ? ' block' : ''}`}
    style={{
      width,
      height,
      backgroundImage: active
        ? `linear-gradient(90deg, ${backgroundColor} 25%, ${activeColor} 37%, ${backgroundColor} 63%)`
        : 'none',
      backgroundColor: active ? 'transparent' : backgroundColor,
      ...style
    }}
  />
);

export default Skeleton;
