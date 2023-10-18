import Layout from '@src/layout';
import '@src/App.css';
import MainPage from '@src/pages/Main';
import { ModalContextProvider } from '@context/modal';
import { ToastContextProvider } from '@context/toast';
import { UrlContextProvider } from '@context/url';

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
