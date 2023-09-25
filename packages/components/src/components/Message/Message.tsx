import React, { useEffect, useRef } from 'react';
import { DirectiveProps } from '@lyrical/react-directive';
import { CheckCircle2, XOctagon, AlertOctagon } from 'lucide-react';

const ICON_MAP = {
  warning: <AlertOctagon className='icon' style={{ fill: 'var(--color-warning)', color: 'var(--color-background)' }} />,
  error: <XOctagon className='icon' style={{ fill: 'var(--color-error)', color: 'var(--color-background)' }} />,
  success: <CheckCircle2 className='icon' style={{ fill: 'var(--color-success)', color: 'var(--color-background)' }} />
};

/**
 * 全局提示渲染参数
 */
export interface MessageRenderProps {
  /**
   * 展示类型
   */
  type?: 'success' | 'warning' | 'error';
  /**
   * 展示信息
   */
  message: React.ReactNode;
  /**
   * 自动关闭的延时，单位毫秒。0 则不关闭。
   * @default 3000
   */
  duration?: number;
}

const MessageRender: React.FC<DirectiveProps<void> & MessageRenderProps> = props => {
  const { type = 'success', message, duration = 3000, hidden, event, options } = props;
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!element.current) return;

    setTimeout(() => {
      if (!element.current) return;
      element.current.style.marginTop = '15px';
      element.current.style.opacity = '1';

      event.on({
        onBeforeClose: () => {
          if (!element.current) return;
          element.current.style.marginTop = '-5px';
          element.current.style.opacity = '0';
        }
      });

      if (duration) {
        setTimeout(() => {
          hidden();
        }, duration - (options.hiddenTimeout || 300));
      }
    }, 0);
  }, [duration, event, hidden, options.hiddenTimeout]);

  return (
    <div ref={element} className='lyric-message'>
      <div className='lyric-message-content'>
        {ICON_MAP[type]}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default MessageRender;
