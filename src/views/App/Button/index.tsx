import { useState } from 'react';
import { Button } from '@lyrical/react-components';

const ButtonView = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <div>
        <div>大小</div>
        <div style={{ margin: 20 }}>
          <Button size='large'>large</Button>
          <Button size='middle' style={{ marginLeft: 20 }}>
            middle
          </Button>
          <Button size='small' style={{ marginLeft: 20 }}>
            small
          </Button>
        </div>
      </div>
      <div>
        <div>类型</div>
        <div style={{ margin: 20 }}>
          <Button effect-ripple type='primary'>
            primary
          </Button>
          <Button effect-ripple type='default' style={{ marginLeft: 20 }}>
            default
          </Button>
          <Button effect-ripple type='dashed' style={{ marginLeft: 20 }}>
            dashed
          </Button>
          <Button effect-ripple type='text' style={{ marginLeft: 20 }}>
            text
          </Button>
          <Button effect-ripple type='link' style={{ marginLeft: 20 }}>
            link
          </Button>
        </div>
      </div>
      <div>
        <div>
          <span style={{ marginRight: 20 }}>加载</span>
          <Button effect-ripple type={loading ? 'primary' : 'dashed'} onClick={() => setLoading(v => !v)}>
            {loading ? '关闭' : '开启'}
          </Button>
        </div>
        <div style={{ margin: 20 }}>
          <Button type='primary' loading={loading} effect-ripple>
            primary
          </Button>
          <Button type='default' loading={loading} style={{ marginLeft: 20 }}>
            default
          </Button>
          <Button type='dashed' loading={loading} style={{ marginLeft: 20 }}>
            dashed
          </Button>
          <Button type='text' loading={loading} style={{ marginLeft: 20 }}>
            text
          </Button>
          <Button type='link' loading={loading} style={{ marginLeft: 20 }}>
            link
          </Button>
        </div>
        <div style={{ margin: 20 }}>
          <Button type='primary' loading={loading} loadingMode='inline-fill' effect-ripple>
            primary
          </Button>
          <Button type='default' loading={loading} loadingMode='inline-fill' style={{ marginLeft: 20 }}>
            default
          </Button>
          <Button type='dashed' loading={loading} loadingMode='inline-fill' style={{ marginLeft: 20 }}>
            dashed
          </Button>
          <Button type='text' loading={loading} loadingMode='inline-fill' style={{ marginLeft: 20 }}>
            text
          </Button>
          <Button type='link' loading={loading} loadingMode='inline-fill' style={{ marginLeft: 20 }}>
            link
          </Button>
        </div>
        <div style={{ margin: 20 }}>
          <Button type='primary' loading={loading} loadingMode='sibling' effect-ripple>
            primary
          </Button>
          <Button type='default' loading={loading} loadingMode='sibling' style={{ marginLeft: 20 }}>
            default
          </Button>
          <Button type='dashed' loading={loading} loadingMode='sibling' style={{ marginLeft: 20 }}>
            dashed
          </Button>
          <Button type='text' loading={loading} loadingMode='sibling' style={{ marginLeft: 20 }}>
            text
          </Button>
          <Button type='link' loading={loading} loadingMode='sibling' style={{ marginLeft: 20 }}>
            link
          </Button>
        </div>
      </div>

      <div>
        禁用
        <div style={{ margin: 20 }}>
          <Button type='primary' disabled effect-ripple>
            primary
          </Button>
          <Button type='default' disabled style={{ marginLeft: 20 }}>
            default
          </Button>
          <Button type='dashed' disabled style={{ marginLeft: 20 }}>
            dashed
          </Button>
          <Button type='text' disabled style={{ marginLeft: 20 }}>
            text
          </Button>
          <Button type='link' disabled style={{ marginLeft: 20 }}>
            link
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonView;
