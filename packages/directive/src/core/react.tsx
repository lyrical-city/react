import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';

const createMountElement = () => {
  const mountElement = document.createElement('div');

  mountElement.className = 'lyric-directive-element';

  return {
    element: mountElement,

    show() {
      mountElement.style.display = 'block';

      return this;
    },

    hide() {
      mountElement.style.display = 'none';

      return this;
    },

    mount(root: HTMLElement) {
      root.appendChild(mountElement);

      return this;
    },

    unMount() {
      mountElement.parentNode?.removeChild(mountElement);

      return this;
    }
  };
};

const createMountComponent = (Element: React.FC<any>) => {
  let changeVisible: React.Dispatch<React.SetStateAction<boolean>> | null = null;

  const MountComponent: React.FC = (props: any) => {
    const [visible, setVisible] = useState(props.visible || false);

    changeVisible = setVisible;

    const params = useMemo(() => ({ ...props, visible }), [props, visible]);

    return Element(params);
  };

  let root: any;

  return {
    show() {
      changeVisible?.(true);

      return this;
    },

    hide() {
      changeVisible?.(false);

      return this;
    },

    mount(mountElement: HTMLElement, defaultProps: any) {
      const Clone = React.cloneElement(<MountComponent />, defaultProps);

      if ((ReactDOM as any).createRoot) {
        root = (ReactDOM as any).createRoot(mountElement);
        root.render(Clone);
      } else {
        ReactDOM.render(Clone, mountElement);
      }

      return this;
    },

    unMount(mountElement: HTMLElement) {
      if ((ReactDOM as any).createRoot) {
        root.unmount();
      } else {
        ReactDOM.unmountComponentAtNode(mountElement);
      }

      return this;
    }
  };
};

export function createReactDirectiveCore<T>(Element: React.FC<T>) {
  const mountElement = createMountElement();

  const mountComponent = createMountComponent(Element);

  return {
    mountElement,
    mountComponent
  };
}
