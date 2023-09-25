import React, { useEffect, useState } from 'react';

/**
 * 开关参数
 */
export interface SwitchProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 样式
   */
  style?: React.CSSProperties;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 选中子元素
   */
  checkedChildren?: React.ReactNode;
  /**
   * 未选择子元素
   */
  unCheckedChildren?: React.ReactNode;
  /**
   * 是否选中
   */
  checked?: boolean;
  /**
   * 默认选中
   */
  defaultChecked?: boolean;
  /**
   * 变化回调函数
   */
  onChange?: (checked: boolean, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

/**
 * 开关
 */
export const Switch = (props: SwitchProps) => {
  const { className, style, disabled, checkedChildren, unCheckedChildren, checked, defaultChecked, onChange } = props;

  const [inlineChecked, setInlineChecked] = useState(checked === undefined ? defaultChecked : checked);

  useEffect(() => {
    if (checked === undefined) return;
    setInlineChecked(checked);
  }, [checked]);

  return (
    <button
      className={`lyric-switch${inlineChecked ? ' lyric-switch-checked' : ''}${className ? ` ${className}` : ''}`}
      style={style}
      type='button'
      disabled={disabled}
      onClick={e => {
        if (checked === undefined) setInlineChecked(v => !v);
        onChange?.(!checked, e);
      }}
    >
      <span className='lyric-switch-inline'>
        <span className='lyric-switch-checked'>{checkedChildren}</span>
        <span className='lyric-switch-unchecked'>{unCheckedChildren}</span>
      </span>
    </button>
  );
};

export default Switch;
