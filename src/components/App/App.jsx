import './styles/index.css';
import React, { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { useApp } from '../../hooks';
import Main from '../Main/Main';
import Prognosis from '../Prognosis/Prognosis';
import Fact from '../Fact/Fact';

const App = () => {
  const { calcType } = useApp();

  useEffect(() => {
    if (WebApp.BackButton.isVisible) {
      WebApp.BackButton.hide();
    }
  }, []);

  if (calcType === 'prognosis') {
    return <Prognosis />;
  }

  if (calcType === 'fact') {
    return <Fact />;
  }

  return <Main />;
};

export default App;
