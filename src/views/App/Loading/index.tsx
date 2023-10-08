import { useState } from 'react';
import { Loading, Switch } from '@lyrical/react-components';

const LoadingView = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <Switch checked={loading} onChange={checked => setLoading(checked)} />

      <div>
        <Loading loading={loading} />
      </div>

      <div>
        <Loading loading={loading}>
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden' }}>哈哈哈</span>
        </Loading>
      </div>

      <div>
        <Loading loading={loading} mode='sibling'>
          <span>哈哈哈</span>
        </Loading>
      </div>

      <div style={{ marginTop: 20 }}>
        <Loading loading={loading} mode='fill'>
          <div>
            <p>标题</p>
            <p>内容内容内容内容内容内容内容内容</p>
            <p>内容内容内容内容内容内容内容内容</p>
            <p>内容内容内容内容内容内容内容内容</p>
            <p>内容内容内容内容内容内容内容内容</p>
            <p>内容内容内容内容内容内容内容内容</p>
          </div>
        </Loading>
      </div>
    </div>
  );
};

export default LoadingView;
