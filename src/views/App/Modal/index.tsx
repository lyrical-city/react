import { Button, Modal } from '@lyrical/react-components';
import { reactDirective } from '@lyrical/react-directive';

const ModalView = () => (
  <div>
    <Button
      onClick={() => {
        reactDirective.open(
          // eslint-disable-next-line react/no-unstable-nested-components
          props => (
            <Modal visible={props.visible} onCancel={props.hidden} title='标题'>
              内容
            </Modal>
          ),
          {},
          { hiddenTimeout: 300 }
        );
      }}
    >
      Modal
    </Button>
    <Button
      style={{ marginLeft: 20 }}
      onClick={() => {
        Modal.confirm({
          title: '温馨提示',
          content: `确定删除吗？`,
          cancelText: '取消',
          okText: '删除'
        });
      }}
    >
      Confirm
    </Button>
    <Button
      style={{ marginLeft: 20 }}
      onClick={() => {
        Modal.info({
          content: `Info`
        });
      }}
    >
      Info
    </Button>
    <Button
      style={{ marginLeft: 20 }}
      onClick={() => {
        Modal.success({
          content: `Success`
        });
      }}
    >
      Success
    </Button>
    <Button
      style={{ marginLeft: 20 }}
      onClick={() => {
        Modal.error({
          content: `Error`
        });
      }}
    >
      Error
    </Button>
    <Button
      style={{ marginLeft: 20 }}
      onClick={() => {
        Modal.warning({
          content: `Warning`
        });
      }}
    >
      Warning
    </Button>
  </div>
);

export default ModalView;
