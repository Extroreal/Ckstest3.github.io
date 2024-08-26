import './styles/index.css';
import React, { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { Button } from 'qmedia-ui';
import { useApp } from '../../hooks';

const Fact = () => {
  const { setCalcType } = useApp();

  useEffect(() => {
    WebApp.BackButton.show();
    WebApp.onEvent('backButtonClicked', () => {
      setCalcType(null);
    });
  }, []);

  return (
    <div className="fact">
      Расчёт по факту <Button onClick={() => setCalcType(null)}>назад</Button>
    </div>
  );
};

export default Fact;
