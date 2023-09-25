import React, { useEffect, useMemo, useState } from 'react';

/**
 * 多选框参数
 */
export interface CheckboxProps<T extends string | number> {
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
 * 多选框
 */
export function Checkbox<T extends string | number>(props: CheckboxProps<T>) {
  const { children, className, style, disabled, name, value, checked, defaultChecked, onChange } = props;

  const [inlineChecked, setInlineChecked] = useState(checked === undefined ? defaultChecked : checked);

  useEffect(() => {
    if (checked === undefined) return;
    setInlineChecked(checked);
  }, [checked]);

  return (
    <span
      className={`lyric-checkbox${className ? ` ${className}` : ''}${disabled ? ' lyric-checkbox-disabled' : ''}${
        inlineChecked ? ' lyric-checkbox-checked' : ''
      }${children ? ' lyric-checkbox-children' : ''}`}
      style={style}
      onClick={e => {
        if (disabled) return;
        if (checked === undefined) setInlineChecked(v => !v);
        onChange?.(value as T, !checked, e);
      }}
    >
      <input type='checkbox' name={name} value={value} checked={inlineChecked} onChange={() => null} />
      <label>{children}</label>
    </span>
  );
}

/**
 * 多选框组参数
 */
export interface CheckboxGroupProps<T extends string | number> {
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
   * 配置选项
   */
  options: Array<T | { label: React.ReactNode; value: T; disabled?: boolean }>;
  /**
   * 设置当前选中值
   */
  value?: Array<T>;
  /**
   * 默认选中值
   */
  defaultValue?: Array<T>;
  /**
   * 选项变化回调函数
   */
  onChange?: (value: Array<T>) => void;
}

/**
 * 多选框组
 */
function CheckboxGroup<T extends string | number>(props: CheckboxGroupProps<T>) {
  const { className, style, name, disabled, options, value, defaultValue = [], onChange } = props;

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
    <div className={`lyric-checkbox-group${className ? ` ${className}` : ''}`} style={style}>
      {childrenList.map(children => (
        <Checkbox
          key={children.value}
          name={name}
          disabled={disabled || children.disabled}
          value={children.value}
          checked={inlineValue?.includes(children.value)}
          onChange={v => {
            const newValue = inlineValue.includes(v) ? [...inlineValue.filter(e => e !== v)] : [...inlineValue, v];
            if (value === undefined) setInlineValue(newValue);
            onChange?.(newValue);
          }}
        >
          {children.label}
        </Checkbox>
      ))}
    </div>
  );
}

/**
 * 多选框组
 */
Checkbox.Group = CheckboxGroup;

export default Checkbox;
