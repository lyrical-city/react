import React, { ReactNode, useCallback, useLayoutEffect, useState } from 'react';
import { DirectiveElement, DirectiveProps } from '@lyrical/react-directive';
import { Button, ButtonProps } from '../Button';

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox='64 64 896 896'
    focusable='false'
    data-icon='close'
    width='1em'
    height='1em'
    fill='currentColor'
    aria-hidden='true'
    {...props}
  >
    <path d='M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z' />
  </svg>
);

export interface ModalProps {
  /**
   * 子元素
   */
  children?: React.ReactNode | undefined;
  /**
   * 标题
   */
  title?: string;
  /**
   * 内容
   */
  content?: ReactNode;
  /**
   * 标题说明文本
   */
  explain?: ReactNode;
  /**
   * 底部自定义内容
   */
  footer?: ReactNode | false;
  /**
   * 是否可见
   */
  visible?: boolean;
  /**
   * 确认回调
   */
  onOk?: () => void | Promise<void>;
  /**
   * 确认按钮自定义文本
   */
  okText?: string;
  /**
   * 确认按钮参数
   */
  okButtonProps?: ButtonProps;
  /**
   * 取消回调
   */
  onCancel?: () => void;
  /**
   * 取消按钮自定义文本
   */
  cancelText?: string;
  /**
   * 取消按钮参数
   */
  cancelButtonProps?: ButtonProps;
  /**
   * 是否显示关闭按钮
   * @default true
   */
  closable?: boolean;
  /**
   * 遮罩是否可以点击关闭
   * @default true
   */
  maskClosable?: boolean;
}

function ModalOrigin(props: ModalProps) {
  const {
    title,
    content: Content,
    explain: Explain,
    footer: Footer,
    visible,
    onOk,
    okText,
    okButtonProps,
    onCancel,
    cancelText,
    cancelButtonProps,
    closable = true,
    maskClosable = true,
    children
  } = props;

  const [animation, setAnimation] = useState(false);

  useLayoutEffect(() => {
    if (animation) return;

    if (!visible) return;

    setAnimation(true);
  }, [visible, animation]);

  const close = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  const ok = useCallback(() => {
    return onOk?.();
  }, [onOk]);

  return (
    <div
      className={`lyric-modal-root ${visible ? 'open' : 'close'}${animation ? ' animation' : ''}`}
      onClick={maskClosable ? close : undefined}
    >
      <div className='lyric-modal' onClick={e => e.stopPropagation()}>
        {closable && (
          <div className='lyric-modal-close' onClick={close}>
            <CloseIcon className='lyric-modal-x' />
          </div>
        )}
        {title && (
          <div className='lyric-modal-header'>
            <div className='lyric-modal-header-dev'>
              <h3 className='title'>{title}</h3>
              <div className='explain'>{Explain ? Explain : null}</div>
            </div>
          </div>
        )}
        <div className='lyric-modal-body'>{Content ? Content : children}</div>
        {Footer !== false && (
          <div className='lyric-modal-footer'>
            {Footer ? (
              Footer
            ) : (
              <>
                <Button onClick={close} {...(cancelButtonProps || {})}>
                  {cancelText || '取消'}
                </Button>
                <Button type='primary' style={{ marginLeft: 12 }} hasLoading onClick={ok} {...(okButtonProps || {})}>
                  {okText || '确认'}
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const modal = new DirectiveElement<ModalProps>({
  hiddenTimeout: 200,
  transformProps: props => {
    return {
      closable: false,
      maskClosable: false,
      cancelButtonProps: { style: { display: 'none' } },
      onCancel() {
        props.onCancel?.();
        props.hidden();
      },
      async onOk() {
        await props.onOk?.();
        props.hidden();
      }
    };
  }
});

/**
 * 确认提示
 */
ModalOrigin.confirm = (props: Omit<ModalProps, keyof DirectiveProps>) => {
  return modal.open(Modal, props, {
    transformProps: () => {
      return {
        cancelButtonProps: { style: { display: 'block' } }
      };
    }
  });
};

/**
 * 信息提示
 */
ModalOrigin.info = (props: Omit<ModalProps, keyof DirectiveProps>) => {
  return modal.open(Modal, { okText: '知道了', ...props });
};

/**
 * 成功提示
 */
ModalOrigin.success = (props: Omit<ModalProps, keyof DirectiveProps>) => {
  return modal.open(Modal, { okText: '知道了', ...props });
};

/**
 * 警告提示
 */
ModalOrigin.warning = (props: Omit<ModalProps, keyof DirectiveProps>) => {
  return modal.open(Modal, { okText: '知道了', ...props });
};

/**
 * 错误提示
 */
ModalOrigin.error = (props: Omit<ModalProps, keyof DirectiveProps>) => {
  return modal.open(Modal, { okText: '知道了', ...props });
};

export const Modal = ModalOrigin;

export default Modal;
