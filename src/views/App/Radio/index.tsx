import { Radio } from '@lyrical/react-components';

const RadioView = () => {
  return (
    <div>
      <div>
        <div>正常</div>
        <div style={{ marginTop: 20 }}>
          <Radio>A</Radio>
          <Radio type='button' style={{ marginLeft: 20 }}>
            A
          </Radio>
          <Radio type='button-solid' style={{ marginLeft: 20 }}>
            A
          </Radio>
          <Radio.Group style={{ marginLeft: 20 }} name='a' options={['A', 'B', 'C']} defaultValue='B' />
          <Radio.Group type='button' style={{ marginLeft: 20 }} name='b' options={['A', 'B', 'C']} defaultValue='B' />
          <Radio.Group
            type='button-solid'
            style={{ marginLeft: 20 }}
            name='c'
            options={['A', 'B', 'C']}
            defaultValue='B'
          />
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <div>禁用</div>
        <div style={{ marginTop: 20 }}>
          <Radio disabled>A</Radio>
          <Radio disabled type='button' style={{ marginLeft: 20 }}>
            A
          </Radio>
          <Radio disabled type='button-solid' checked style={{ marginLeft: 20 }}>
            A
          </Radio>
          <Radio.Group disabled style={{ marginLeft: 20 }} name='d' options={['A', 'B', 'C']} defaultValue='B' />
          <Radio.Group
            disabled
            type='button'
            style={{ marginLeft: 20 }}
            name='e'
            options={['A', 'B', 'C']}
            defaultValue='B'
          />
          <Radio.Group
            disabled
            type='button-solid'
            style={{ marginLeft: 20 }}
            name='f'
            options={['A', 'B', 'C']}
            defaultValue='B'
          />
        </div>
      </div>
    </div>
  );
};

export default RadioView;
