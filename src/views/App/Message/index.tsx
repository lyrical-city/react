import { Button, message } from '@lyrical/react-components';

const MessageView = () => {
  return (
    <div>
      <div>
        <div>正常</div>
        <div style={{ marginTop: 20 }}>
          <Button
            onClick={() => {
              message.success('成功消息');
            }}
          >
            success
          </Button>
          <Button
            style={{ marginLeft: 20 }}
            onClick={() => {
              message.warning('警告消息');
            }}
          >
            warning
          </Button>
          <Button
            style={{ marginLeft: 20 }}
            onClick={() => {
              message.error('错误消息');
            }}
          >
            error
          </Button>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <div>手动关闭</div>
        <div style={{ marginTop: 20 }}>
          <Button
            onClick={() => {
              const result = message.success(
                <>
                  成功消息{' '}
                  <Button
                    type='link'
                    onClick={() => {
                      result.close();
                    }}
                  >
                    关闭
                  </Button>
                </>,
                { duration: 0 }
              );
            }}
          >
            success
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageView;
