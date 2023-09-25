import React, { useEffect, useMemo, useState } from 'react';

/**
 * 单选框参数
 */
export interface RadioProps<T extends string | number> {
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
  style?: React.CSSProperties;
  /**
   * 类型
   */
  type?: 'radio' | 'button' | 'button-solid';
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 名称
   */
  name?: string;
  /**
   * 值
   */
  value?: T;
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
  onChange?: (value: T, checked: boolean, event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

/**
 * 单选框
 */
export function Radio<T extends string | number>(props: RadioProps<T>) {
  const {
    children,
    className,
    style,
    type = 'radio',
    disabled,
    name,
    value,
    checked,
    defaultChecked,
    onChange
  } = props;

  const [inlineChecked, setInlineChecked] = useState(checked === undefined ? defaultChecked : checked);

  useEffect(() => {
    if (checked === undefined) return;
    setInlineChecked(checked);
  }, [checked]);

  return (
    <span
      className={`lyric-radio lyric-radio-type-${type}${className ? ` ${className}` : ''}${
        disabled ? ' lyric-radio-disabled' : ''
      }${inlineChecked ? ' lyric-radio-checked' : ''}${children ? ' lyric-radio-children' : ''}`}
      style={style}
      onClick={e => {
        if (disabled) return;
        if (checked === undefined) setInlineChecked(v => !v);
        onChange?.(value as T, !checked, e);
      }}
    >
      <input type='radio' name={name} value={value} checked={inlineChecked} onChange={() => null} />
      <label>{children}</label>
    </span>
  );
}

/**
 * 单选框组参数
 */
export interface RadioGroupProps<T extends string | number> {
  /**
   * 类名
   */
  className?: string;
  /**
   * 样式
   */
  style?: React.CSSProperties;
  /**
   * 名称
   */
  name: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 类型
   */
  type?: 'radio' | 'button' | 'button-solid';
  /**
   * 配置选项
   */
  options: Array<T | { label: React.ReactNode; value: T; disabled?: boolean }>;
  /**
   * 设置当前选中值
   */
  value?: T;
  /**
   * 默认选中值
   */
  defaultValue?: T;
  /**
   * 选项变化回调函数
   */
  onChange?: (value: T) => void;
}

/**
 * 单选框组
 */
function RadioGroup<T extends string | number>(props: RadioGroupProps<T>) {
  const { className, style, name, disabled, type, options, value, defaultValue, onChange } = props;

  const [inlineValue, setInlineValue] = useState(value === undefined ? defaultValue : value);

  useEffect(() => {
    if (value === undefined) return;
    setInlineValue(value);
  }, [value]);

  const childrenList = useMemo(
    () =>
      options.map(item => (typeof item === 'object' ? item : { label: item, value: item, disabled: false })) as Array<{
        label: React.ReactNode;
        value: T;
        disabled?: boolean;
      }>,
    [options]
  );

  return (
    <div className={`lyric-radio-group${className ? ` ${className}` : ''}`} style={style}>
      {childrenList.map(children => (
        <Radio
          key={children.value}
          name={name}
          type={type}
          disabled={disabled || children.disabled}
          value={children.value}
          checked={inlineValue === children.value}
          onChange={v => {
            if (value === undefined) setInlineValue(v);
            onChange?.(v);
          }}
        >
          {children.label}
        </Radio>
      ))}
    </div>
  );
}

/**
 * 单选框组
 */
Radio.Group = RadioGroup;

export default Radio;
