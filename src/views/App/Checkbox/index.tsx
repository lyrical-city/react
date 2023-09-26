import { Checkbox } from '@lyrical/react-components';

const CheckboxView = () => {
  return (
    <div>
      <div>
        <div>正常</div>
        <div style={{ marginTop: 20 }}>
          <Checkbox>A</Checkbox>
          <Checkbox style={{ marginLeft: 20 }}>B</Checkbox>
          <Checkbox.Group style={{ marginLeft: 20 }} name='a' options={['A', 'B', 'C']} defaultValue={['A', 'B']} />
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div>禁用</div>
        <div style={{ marginTop: 20 }}>
          <Checkbox disabled>A</Checkbox>
          <Checkbox disabled style={{ marginLeft: 20 }}>
            B
          </Checkbox>
          <Checkbox.Group
            disabled
            style={{ marginLeft: 20 }}
            name='b'
            options={['A', 'B', 'C']}
            defaultValue={['A', 'B']}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckboxView;
