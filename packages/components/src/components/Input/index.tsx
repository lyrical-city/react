import React, { useState, useEffect } from 'react';

export interface InputProps {
  /**
   * 名称
   */
  name?: string;
  /**
   * 尺寸
   */
  size?: 'large' | 'middle' | 'small';
  /**
   * 提示文本
   */
  placeholder?: string;
  /**
   * 设置当前选中值
   */
  value?: string;
  /**
   * 默认选中值
   */
  defaultValue?: string;
  /**
   * 选项变化回调函数
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  const { name, size = 'middle', placeholder, defaultValue, value, onChange } = props;

  const [inlineValue, setInlineValue] = useState(value === undefined ? defaultValue : value);

  useEffect(() => {
    if (value === undefined) return;
    setInlineValue(value);
  }, [value]);

  return (
    <input
      type='text'
      className='lyric-input'
      name={name}
      data-size={size}
      placeholder={placeholder}
      value={inlineValue}
      onChange={e => {
        if (value === undefined) setInlineValue(e.target.value);
        onChange?.(e);
      }}
    />
  );
};

export default Input;
