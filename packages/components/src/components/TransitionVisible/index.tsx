import React from 'react';
import Transition, { TransitionProps } from '../Transition';

interface ISpace {
  clientRect: {
    width: number;
    height: number;
  };
  init: boolean;
}

const changeNodeScale = (scale: number, node: HTMLElement, originRect: { width: number; height: number }) => {
  node.style.transform = `scale(${scale})`;
  node.style.width = originRect.width * scale + 'px';
  node.style.height = originRect.height * scale + 'px';
};

const getNodeBoundingClientRect = (node: HTMLElement) => {
  return node.getBoundingClientRect() || { width: 0, height: 0 };
};

const cycles: TransitionProps<ISpace>['cycles'] = {
  enter: {
    start({ node, space }) {
      if (!node) return;
      if (!space.init || !space.clientRect) {
        space.init = true;
        node.style.transition = `all 0s`;
        space.clientRect = getNodeBoundingClientRect(node);
        // console.log(11111, space.clientRect.width, space.clientRect.height);
      }

      changeNodeScale(0, node, space.clientRect);
      // console.log(1111111111, node, node.style.width, node.style.transform, node.style.transition);
    },
    progress({ node, space, props }) {
      if (!node) return;
      node.style.transition = `all ${props.timeout?.enter ? props.timeout.enter / 1000 : 0.3}s`;
      changeNodeScale(1, node, space.clientRect);
      // console.log(2222222222, node, node.style.width, node.style.transform, node.style.transition);
    },
    end({ node, space, mount }) {
      if (!node) return;
      if (mount) node.style.transform = `scale(1)`;
      else changeNodeScale(1, node, space.clientRect);
      // console.log(333333333, node, node.style.width, node.style.transform, node.style.transition);
    }
  },
  exit: {
    start({ node, space }) {
      if (!node) return;
      if (!space.init || !space.clientRect) {
        space.init = true;
        node.style.transition = `all 0s`;
        space.clientRect = getNodeBoundingClientRect(node);
      }
      changeNodeScale(1, node, space.clientRect);
      // console.log(44444444, node, node.style.width, node.style.transform, node.style.transition);
    },
    progress({ node, space, props }) {
      if (!node) return;
      if (!space.init || !space.clientRect) {
        space.init = true;
        space.clientRect = getNodeBoundingClientRect(node);
      }
      node.style.transition = `all ${props.timeout?.exit ? props.timeout.exit / 1000 : 0.3}s`;
      changeNodeScale(0, node, space.clientRect);
      // console.log(5555555, node, node.style.width, node.style.transform, node.style.transition);
    },
    end({ node, space }) {
      if (!node) return;
      changeNodeScale(0, node, space.clientRect);
      // console.log(666666, node, node.style.width, node.style.transform, node.style.transition);
    }
  }
};

/**
 * 过度显影
 */
export const TransitionVisible = (props: Omit<TransitionProps<ISpace>, 'cycles' | 'name'>) => {
  return <Transition {...props} name='' space={{ init: false, clientRect: { width: 0, height: 0 } }} cycles={cycles} />;
};

export default TransitionVisible;
