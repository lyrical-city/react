import { Loading } from '@lyrical/react-components';

const LoadingView = () => {
  return (
    <div>
      <div>
        <Loading loading />
      </div>

      <div style={{ marginTop: 20 }}>
        <Loading loading mode='fill'>
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

      <div>
        <Loading loading mode='sibling'>
          <span>哈哈哈</span>
        </Loading>
      </div>
    </div>
  );
};

export default LoadingView;
