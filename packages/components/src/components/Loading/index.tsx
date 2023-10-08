import React, { useMemo, useRef } from 'react';
import TransitionVisible from '../TransitionVisible';

export interface LoadingProps {
  /**
   * 子元素
   */
  children?: React.ReactNode | undefined;
  /**
   * 类名
   */
  className?: string;
  /**
   * 受控 Loading
   */
  loading: boolean;
  /**
   * 自定义渲染 Loading
   */
  loadingComponent?: React.FC;
  /**
   * 模式
   * @default 'default'
   */
  mode?: 'default' | 'fill' | 'inline-fill' | 'sibling';
}

const LoadingIcon = ({ className, ...props }: { className?: string; ['effect-visible']?: 'true' | 'false' }) => (
  <span className={`lyric-loading${className ? ` ${className}` : ''}`} {...props}>
    <svg
      className='lyric-loading-icon'
      viewBox='0 0 1024 1024'
      focusable='false'
      data-icon='loading'
      width='1em'
      height='1em'
      fill='currentColor'
      aria-hidden='true'
    >
      <path d='M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z' />
    </svg>
  </span>
);

export const Loading: React.FC<LoadingProps> = props => {
  const { loading, mode = 'default', className, loadingComponent: LoadingComponent = LoadingIcon, children } = props;
  const count = useRef(0);

  const loadingRender = useMemo(
    () => <LoadingComponent className={`${mode}${className ? ` ${className}` : ''}${loading ? ' activate' : ''}`} />,
    [LoadingComponent, className, loading, mode]
  );

  const defaultRender = useMemo(
    () => (
      <>
        <TransitionVisible show={loading}>{loadingRender}</TransitionVisible>
        <TransitionVisible show={!loading}>{children as any}</TransitionVisible>
      </>
    ),
    [children, loading, loadingRender]
  );

  const fillRender = useMemo(() => {
    const r = (
      <>
        {loading && loadingRender}
        {!loading || count.current > 1 ? children : null}
      </>
    );

    if (!loading) count.current += 1;
    return r;
  }, [children, loading, loadingRender]);

  const inlineFillRender = useMemo(
    () => (
      <>
        {loading && loadingRender}
        {children}
      </>
    ),
    [children, loading, loadingRender]
  );

  const siblingRender = useMemo(
    () => (
      <>
        <TransitionVisible show={loading}>
          <LoadingComponent className={`${mode}${className ? ` ${className}` : ''}${loading ? ' activate' : ''}`} />
        </TransitionVisible>
        {children}
      </>
    ),
    [LoadingComponent, children, className, loading, mode]
  );

  return mode === 'fill' ? (
    <div className='lyric-loading-fill'>{fillRender}</div>
  ) : mode === 'inline-fill' ? (
    inlineFillRender
  ) : mode === 'sibling' ? (
    siblingRender
  ) : (
    defaultRender
  );
};

export default Loading;
