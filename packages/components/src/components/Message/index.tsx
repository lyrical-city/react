import { reactDirective } from '@lyrical/react-directive';
import MessageRender, { MessageRenderProps } from './Message';

const lyricMessagePlateClassName = 'lyric-message-plate';

class Message {
  private root;

  constructor() {
    let messagePlate: HTMLDivElement | null = document.querySelector(`.${lyricMessagePlateClassName}`);

    if (!messagePlate) {
      messagePlate = document.createElement('div');
      messagePlate.classList.add(lyricMessagePlateClassName);
      document.body.append(messagePlate);
    }

    this.root = messagePlate;
  }

  /**
   * 成功消息
   */
  success(message: React.ReactNode, props: Omit<MessageRenderProps, 'message' | 'type'> = {}) {
    return reactDirective.open(
      MessageRender,
      { message, type: 'success', ...props },
      { root: this.root, hiddenTimeout: 300 }
    );
  }

  /**
   * 警告消息
   */
  warning(message: React.ReactNode, props: Omit<MessageRenderProps, 'message' | 'type'> = {}) {
    return reactDirective.open(
      MessageRender,
      { message, type: 'warning', ...props },
      { root: this.root, hiddenTimeout: 300 }
    );
  }

  /**
   * 错误消息
   */
  error(message: React.ReactNode, props: Omit<MessageRenderProps, 'message' | 'type'> = {}) {
    return reactDirective.open(
      MessageRender,
      { message, type: 'error', ...props },
      { root: this.root, hiddenTimeout: 300 }
    );
  }
}

/**
 * 通知消息
 */
export const message = new Message();

export default message;
