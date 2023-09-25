import React, { useCallback, useEffect, useRef, useState } from 'react';

// TODO: 垂直 Menu
// TODO: 图标 Menu
// TODO: 多级嵌套 Menu 悬浮模式 以及 内嵌模式

export interface MenuProps<V> {
  /**
   * 菜单列表
   */
  menuList: Array<{ label: string; value: V }>;
  /**
   * 默认激活
   */
  defaultActive?: V;
  /**
   * Menu 激活时
   */
  onActive?: (value: V) => void;
  /**
   * 菜单模式
   * @default 'horizontal'
   */
  mode?: 'vertical' | 'horizontal';
}

export function Menu<V = string>(props: MenuProps<V>) {
  const { menuList, defaultActive: defaultValue = menuList[0].value, onActive: onChange, mode = 'horizontal' } = props;
  const [active, setActive] = useState(defaultValue);
  const menuRef = useRef<HTMLDivElement>(null);
  const signRef = useRef<HTMLDivElement>(null);

  const calcSignCoordVertical = useCallback(() => {
    if (!menuRef.current || !signRef.current) return;

    const dom = menuRef.current.querySelector('.lyric-menu-item[data-active="true"]');
    if (!dom) return;
    const items = Array.from(menuRef.current.querySelectorAll('.lyric-menu-item'));

    let num = 0;
    for (const item of items) {
      if (item.getAttribute('data-active') === 'true') break;
      num += parseInt(window.getComputedStyle(item).height, 10);
    }

    const paddingTop = parseInt(window.getComputedStyle(dom).paddingTop, 10);

    signRef.current.style.top = num + paddingTop + 'px';

    const domStyle = window.getComputedStyle(dom);
    signRef.current.style.right = '-1px';
    signRef.current.style.width = '1px';
    signRef.current.style.height = parseInt(domStyle.height, 10) - paddingTop * 2 + 'px';
  }, []);

  const calcSignCoordHorizontal = useCallback(() => {
    if (!menuRef.current || !signRef.current) return;

    const dom = menuRef.current.querySelector('.lyric-menu-item[data-active="true"]');
    if (!dom) return;
    const items = Array.from(menuRef.current.querySelectorAll('.lyric-menu-item'));

    let num = 0;
    for (const item of items) {
      if (item.getAttribute('data-active') === 'true') break;
      num += parseInt(window.getComputedStyle(item).width, 10);
    }

    const paddingLeft = parseInt(window.getComputedStyle(dom).paddingLeft, 10);

    signRef.current.style.left = num + paddingLeft + 'px';

    const domStyle = window.getComputedStyle(dom);
    signRef.current.style.bottom = '-1px';
    signRef.current.style.height = '1px';
    signRef.current.style.width = parseInt(domStyle.width, 10) - paddingLeft * 2 + 'px';
  }, []);

  useEffect(() => {
    if (mode === 'horizontal') calcSignCoordHorizontal();
    else calcSignCoordVertical();
  }, [calcSignCoordHorizontal, calcSignCoordVertical, mode]);

  const onActive = useCallback(
    (value: V) => {
      setActive(value);
      onChange?.(value);
      setTimeout(mode === 'horizontal' ? calcSignCoordHorizontal : calcSignCoordVertical);
    },
    [calcSignCoordHorizontal, calcSignCoordVertical, mode, onChange]
  );

  const isActive = useCallback(
    (value: V) => {
      return value === active;
    },
    [active]
  );

  return (
    <nav className={`lyric-menu ${mode}`} ref={menuRef}>
      <div className='lyric-menu-sign' ref={signRef} />
      {menuList.map(menu => (
        <div
          key={String(menu.value)}
          className='lyric-menu-item'
          data-active={String(isActive(menu.value))}
          onClick={() => onActive(menu.value)}
        >
          {menu.label}
        </div>
      ))}
    </nav>
  );
}

export default Menu;
