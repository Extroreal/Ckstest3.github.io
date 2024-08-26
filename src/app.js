import WebApp from '@twa-dev/sdk';
import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import AppProvider from './contexts/AppContext';

const app = () => {
  WebApp.ready();

  const rootNode = document.querySelector('#react-app');
  if (!rootNode) return;

  const root = ReactDOM.createRoot(rootNode);

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
};

export default app;
