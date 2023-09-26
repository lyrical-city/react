import { useLayoutEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from '@lyrical/react-components';
import theme from '@lyrical/theme';
import router from '../../router';
import '@lyrical/styles';
import './index.less';

theme.updateDefaultUseParams({ selectorMode: 'attr' });

const App = () => {
  const [themeList, setThemeList] = useState<ReturnType<typeof theme.schema.getAll>>([]);

  useLayoutEffect(() => {
    const list = theme.schema.getAll();
    setThemeList(list);
    theme.use(list[0].code);
  }, []);

  const menuList = useMemo(
    () =>
      router.getRoute(map => map.app)?.children?.map(route => ({ label: route.title || '', value: route.name })) || [],
    []
  );

  return (
    <div>
      <div className='theme'>
        {themeList.length && (
          <Menu
            defaultActive={themeList[0].code}
            menuList={themeList.map(t => ({ label: t.name, value: t.code }))}
            onActive={value => theme.use(value)}
          />
        )}
      </div>
      <div className='app'>
        <ul>
          <li style={{ color: 'var(--color-1)' }}>1</li>
          <li style={{ color: 'var(--color-2)' }}>2</li>
          <li style={{ color: 'var(--color-3)' }}>3</li>
          <li style={{ color: 'var(--color-4)' }}>4</li>
          <li style={{ color: 'var(--color-5)' }}>5</li>
          <li style={{ color: 'var(--color-6)' }}>6</li>
          <li style={{ color: 'var(--color-7)' }}>7</li>
          <li style={{ color: 'var(--color-8)' }}>8</li>
          <li style={{ color: 'var(--color-9)' }}>9</li>
          <li style={{ color: 'var(--color-10)' }}>10</li>
        </ul>
        指定
        <span data-theme-color='light' style={{ color: 'var(--color-6)' }}>
          【浅色主题】
        </span>
        ：
        <ul data-theme-color='light'>
          <li data-theme-color='light' style={{ color: 'var(--color-1)' }}>
            1
          </li>
          <li data-theme-color='light' style={{ color: 'var(--color-2)' }}>
            2
          </li>
          <li data-theme-color='light' style={{ color: 'var(--color-3)' }}>
            3
          </li>
          <li data-theme-color='light' style={{ color: 'var(--color-4)' }}>
            4
          </li>
          <li data-theme-color='light' style={{ color: 'var(--color-5)' }}>
            5
          </li>
          <li data-theme-color='light' style={{ color: 'var(--color-6)' }}>
            6
          </li>
          <li data-theme-color='light' style={{ color: 'var(--color-7)' }}>
            7
          </li>
          <li data-theme-color='light' style={{ color: 'var(--color-8)' }}>
            8
          </li>
          <li data-theme-color='light' style={{ color: 'var(--color-9)' }}>
            9
          </li>
          <li data-theme-color='light' style={{ color: 'var(--color-10)' }}>
            10
          </li>
        </ul>
        <div className='side'>
          <Menu
            mode='vertical'
            defaultActive={menuList[0].value}
            menuList={menuList}
            onActive={value => router.go(value)}
          />
        </div>
        <div className='outlet'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
