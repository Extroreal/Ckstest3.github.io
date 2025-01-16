import './styles/index.css';
import React, { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { Button } from 'qmedia-ui';
import { useApp } from '../../hooks';
import Under from '../Under/Under';

const Main = () => {
  const { setCalcType } = useApp();

  useEffect(() => {
    WebApp.BackButton.hide();
    WebApp.MainButton.hide();
  }, []);

  return (
    <div className="main">
      <div className="main__header">
        <div className="main__header-title _h1">
          Калькулятор
          <br />
          <Under>Unit-экономики</Under>
        </div>
        <div className="main__header-caption">Опаньки жопаньки</div>
      </div>
      <div className="main__body">
        Бла бла бла бла, я тестирую.
      </div>
      <div className="main__choise">
        <div className="main__choise-title _h3">Выберите тип расчёта</div>
        <div className="main__choise-button">
          <Button
            onClick={() => {
              setCalcType('prognosis');
            }}
          >
            Прогноз
          </Button>
          <p>Вы хотите спрогнозировать экономику до запуска проекта или рекламных активностей</p>
        </div>
        <div className="main__choise-button">
          <Button
            onClick={() => {
              setCalcType('fact');
            }}
          >
            По факту
          </Button>
          <p>
            У вас есть реальные цифры, и нужно знать, как с ними работать и какие решения принимать
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
