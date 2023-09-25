import React, { useRef, useEffect, useState } from 'react';

/**
 * 面板视图参数
 */
interface IPanelViewProps {
  /**
   * 子元素
   */
  children?: React.ReactNode | undefined;
  /**
   * 类名
   */
  className?: string;
  /**
   * 操作面板
   */
  operate: React.ReactNode;
  /**
   * 操作面板宽度
   */
  operateWidth?: number;
  /**
   * 面板布局
   * @default 'center'
   */
  space?: 'center' | 'space-between';
}

/**
 * 面板视图
 */
export const PanelView: React.FC<IPanelViewProps> = props => {
  const { className, operate, children, operateWidth, space } = props;
  const operateRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (operateWidth) {
      setWidth(operateWidth);
      return;
    }

    if (!operate || !operateRef.current) return;

    setWidth(operateRef.current.offsetWidth);
  }, [operate, operateWidth]);

  return (
    <div className={`lyric-panel${className ? ` ${className}` : ''}${space ? ` ${space}` : ''}`}>
      <div className='lyric-panel-content' style={{ maxWidth: `calc(100% - ${!space ? width * 2 + 8 : 12}px)` }}>
        {children}
      </div>
      <div className='lyric-panel-operate' ref={operateRef}>
        {operate}
      </div>
    </div>
  );
};

export default PanelView;
