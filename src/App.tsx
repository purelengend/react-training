import { ModalContextProvider } from '@context/modal';
import { ToastContextProvider } from '@context/toast';
import { UrlContextProvider } from '@context/url';
import Layout from '@src/layout';
import MainPage from '@src/pages/Main';

import '@src/App.css';

function App() {
  return (
    <UrlContextProvider>
      <ModalContextProvider>
        <ToastContextProvider>
          <Layout>
            <MainPage />
          </Layout>
        </ToastContextProvider>
      </ModalContextProvider>
    </UrlContextProvider>
  );
}

export default App;
