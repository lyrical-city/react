import React, { CSSProperties, useState, useEffect, useMemo } from 'react';
import Loading, { LoadingProps } from '../Loading';
import '@lyrical/effects';

export interface ButtonProps {
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 类名
   */
  className?: string;
  /**
   * 样式
   */
  style?: CSSProperties;
  /**
   * 宽度
   */
  width?: number;
  /**
   * 高度
   */
  height?: number;
  /**
   * 是否根据 onClick 返回 Promise 进行 Loading
   */
  hasLoading?: boolean;
  /**
   * 受控 Loading
   */
  loading?: boolean;
  /**
   * Loading 模式
   */
  loadingMode?: Exclude<LoadingProps['mode'], 'fill'>;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 尺寸
   */
  size?: 'large' | 'middle' | 'small';
  /**
   * 类型
   */
  htmlType?: 'button' | 'reset' | 'submit';
  /**
   * 类型
   */
  type?: 'link' | 'text' | 'dashed' | 'default' | 'primary';
  /**
   * 点击事件
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<any>;
  /**
   * 涟漪效果
   */
  'effect-ripple'?: boolean;
}

export const Button: React.FC<ButtonProps> = props => {
  const {
    children,
    style = {},
    width,
    height,
    hasLoading = false,
    loading: controlledLoading,
    loadingMode = 'default',
    disabled = false,
    size = 'middle',
    htmlType = 'button',
    onClick,
    type = 'default',
    className,
    ...effectOptions
  } = props;

  const [loading, setLoading] = useState(!!controlledLoading);

  useEffect(() => {
    setLoading(!!controlledLoading);
  }, [controlledLoading]);

  const renderStyle: CSSProperties = {};
  if (width) renderStyle.width = width;
  if (height) {
    renderStyle.height = height;
    renderStyle.lineHeight = `${height}px`;
  }

  const options: { onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void } = {};

  const forbid = useMemo(() => disabled || loading, [disabled, loading]);

  if (onClick)
    options.onClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (forbid) return;

      if (!hasLoading) {
        onClick(event);
        return;
      }

      setLoading(true);

      try {
        await onClick(event);
      } catch (error) {}

      setLoading(false);
    };

  return (
    <button
      disabled={forbid}
      // eslint-disable-next-line react/no-unknown-property
      effect-ripple={effectOptions['effect-ripple'] ? (forbid ? 'false' : 'true') : undefined}
      {...options}
      className={`lyric-button ${size} ${type}${className ? ` ${className}` : ''}${
        loading ? ' lyric-button-loading' : ''
      }`}
      style={{ ...style, ...renderStyle }}
      type={htmlType}
    >
      <Loading loading={loading} mode={loadingMode}>
        <span>{children ?? '按钮'}</span>
      </Loading>
    </button>
  );
};

export default Button;
