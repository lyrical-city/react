import { useLayoutEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { RouterView } from '@lyrical/react-router';
import ReactDOM from 'react-dom/client';
import router from './router';
import './index.less';

const Main = () => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    router.initNavigate(navigate);
  }, [navigate]);

  return <RouterView routes={router.routes} />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);
