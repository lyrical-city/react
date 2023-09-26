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
  </div>
);

export default ModalView;
