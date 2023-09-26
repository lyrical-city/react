import { useState } from 'react';
import { Switch, TransitionVisible } from '@lyrical/react-components';

const TransitionView = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Switch checked={checked} onChange={c => setChecked(c)} />
      <div style={{ marginTop: 20 }}>
        <div>动态</div>
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'inline-block', background: 'rgba(0,0,0,.3)', padding: 12 }}>
            {'=> '}
            <TransitionVisible show={checked}>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden' }}>哈哈哈</span>
            </TransitionVisible>
          </div>
          <div style={{ display: 'inline-block', background: 'rgba(0,0,0,.3)', padding: 12, marginLeft: 20 }}>
            {'=> '}
            <TransitionVisible show={checked} unmountOnExit>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden' }}>哈哈哈</span>
            </TransitionVisible>
          </div>
          <div style={{ display: 'inline-block', background: 'rgba(0,0,0,.3)', padding: 12, marginLeft: 20 }}>
            {'=> '}
            <TransitionVisible show={checked} unmountOnExit initTransition>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden' }}>哈哈哈</span>
            </TransitionVisible>
          </div>
          <div style={{ display: 'inline-block', background: 'rgba(0,0,0,.3)', padding: 12, marginLeft: 20 }}>
            {'=> '}
            <TransitionVisible show={checked} initTransition>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden' }}>哈哈哈</span>
            </TransitionVisible>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div>展示</div>
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'inline-block', background: 'rgba(0,0,0,.3)', padding: 12 }}>
            {'=> '}
            <TransitionVisible show={true}>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden' }}>哈哈哈</span>
            </TransitionVisible>
          </div>
          <div style={{ display: 'inline-block', background: 'rgba(0,0,0,.3)', padding: 12, marginLeft: 20 }}>
            {'=> '}
            <TransitionVisible show={true} unmountOnExit>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden' }}>哈哈哈</span>
            </TransitionVisible>
          </div>
          <div style={{ display: 'inline-block', background: 'rgba(0,0,0,.3)', padding: 12, marginLeft: 20 }}>
            {'=> '}
            <TransitionVisible show={true} unmountOnExit initTransition>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden' }}>哈哈哈</span>
            </TransitionVisible>
          </div>
          <div style={{ display: 'inline-block', background: 'rgba(0,0,0,.3)', padding: 12, marginLeft: 20 }}>
            {'=> '}
            <TransitionVisible show={true} initTransition>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden' }}>哈哈哈</span>
            </TransitionVisible>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div>隐藏</div>
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'inline-block', background: 'rgba(0,0,0,.3)', padding: 12 }}>
            {'=> '}
            <TransitionVisible show={false}>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>哈哈哈</span>
            </TransitionVisible>
          </div>
          <div style={{ display: 'inline-block', background: 'rgba(0,0,0,.3)', padding: 12, marginLeft: 20 }}>
            {'=> '}
            <TransitionVisible show={false} unmountOnExit>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>哈哈哈</span>
            </TransitionVisible>
          </div>
          <div style={{ display: 'inline-block', background: 'rgba(0,0,0,.3)', padding: 12, marginLeft: 20 }}>
            {'=> '}
            <TransitionVisible show={false} unmountOnExit initTransition>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>嘿嘿嘿</span>
            </TransitionVisible>
          </div>
          <div style={{ display: 'inline-block', background: 'rgba(0,0,0,.3)', padding: 12, marginLeft: 20 }}>
            {'=> '}
            <TransitionVisible show={false} initTransition>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>嘿嘿嘿</span>
            </TransitionVisible>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransitionView;
