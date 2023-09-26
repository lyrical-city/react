import { Switch } from '@lyrical/react-components';

const SwitchView = () => {
  return (
    <div>
      <div>
        <Switch />
        <Switch defaultChecked style={{ marginLeft: 20 }} />
      </div>
      <div style={{ marginTop: 20 }}>
        <Switch checkedChildren='开启' unCheckedChildren='关闭' />
        <Switch defaultChecked checkedChildren='开启' unCheckedChildren='关闭' style={{ marginLeft: 20 }} />
      </div>
      <div style={{ marginTop: 20 }}>
        <Switch disabled />
        <Switch disabled defaultChecked style={{ marginLeft: 20 }} />
      </div>
    </div>
  );
};

export default SwitchView;
