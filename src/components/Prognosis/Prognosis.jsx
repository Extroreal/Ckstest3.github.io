import './styles/index.css';
import React, { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { useApp } from '../../hooks';
import Form from '../Form/Form';
import Result from '../Result/Result';

const Prognosis = () => {
  const { setCalcType, formatPrice, formatNumber } = useApp();

  const [budget, setBudget] = React.useState('');
  const [cpc, setCpc] = React.useState('');
  const [cr1, setCr1] = React.useState('');
  const [cr2, setCr2] = React.useState('');
  const [averageSales, setAverageSales] = React.useState('');
  const [margin, setMargin] = React.useState('');
  const [retention, setRetention] = React.useState('');

  const [groups, setGroups] = React.useState([]);
  const [canCalculate, setCanCalculate] = React.useState(false);
  const [results, setResults] = React.useState([]);

  useEffect(() => {
    WebApp.BackButton.onClick(() => {
      setCalcType(null);
    });
    WebApp.BackButton.show();
  }, []);

  useEffect(() => {
    setGroups([
      {
        title: 'Параметры рекламной кампании',
        fields: [
          {
            label: '💰 Бюджет (Budget)',
            caption: 'Бюджет рекламной кампании',
            name: 'budget',
            value: budget,
            setValue: setBudget,
            unit: 'руб.',
          },
          {
            label: '💸 CPC',
            caption: 'Стоимость перехода на сайт',
            name: 'cpc',
            value: cpc,
            setValue: setCpc,
            unit: 'руб.',
          },
        ],
      },
      {
        title: 'Параметры продаж',
        fields: [
          {
            label: '📈 Конверсия сайта (CR1)',
            caption: 'Какой % посетителей вашего сайта оставят заказ или свяжутся с вами',
            name: 'cr1',
            value: cr1,
            setValue: setCr1,
            unit: '%',
          },
          {
            label: '💬 Конверсия отдела продаж (CR2)',
            caption: 'Какой % обращений превращаются в реальные продажи',
            name: 'cr2',
            value: cr2,
            setValue: setCr2,
            unit: '%',
          },
        ],
      },
      {
        title: 'Параметры бизнес модели',
        fields: [
          {
            label: '🛒 Средний чек (Average Sales)',
            caption: 'На какую сумму в среднем покупает один клиент',
            name: 'averageSales',
            value: averageSales,
            setValue: setAverageSales,
            unit: 'руб.',
          },
          {
            label: '📊 Маржинальность (Margin)',
            caption:
              'Какой % выручки остается после продажи товаров (за вычетом себестоимости) или оказания услуг',
            name: 'margin',
            value: margin,
            setValue: setMargin,
            unit: '%',
          },
          {
            label: '🔄 Количество покупок на клиента (Retention)',
            caption:
              'Сколько покупок совершает один клиент за весь жизненный цикл. Цель любого бизнеса удерживать клиента как можно дольше',
            name: 'retention',
            value: retention,
            setValue: setRetention,
            unit: 'шт.',
          },
        ],
      },
    ]);

    setCanCalculate(
      Boolean(
        budget !== ''
          && cpc !== ''
          && cr1 !== ''
          && cr2 !== ''
          && averageSales !== ''
          && margin !== ''
          && retention !== '',
      ),
    );
  }, [budget, cpc, cr1, cr2, averageSales, margin, retention]);

  useEffect(() => {
    if (!canCalculate) {
      setResults([]);
      return;
    }

    const ltv = averageSales * (margin / 100) * retention;
    const users = budget / cpc;
    const leads = users * (cr1 / 100);
    const buyers = leads * (cr2 / 100);
    const totalProfit = buyers * ltv - budget;
    const porogCpc = ltv * (cr2 / 100) * (cr1 / 100);
    const porogCpa = ltv * (cr2 / 100);
    const cpa = cpc / (cr1 / 100);
    const costPerAquisition = cpa / (cr2 / 100);
    const totalRevenue = buyers * averageSales * retention;
    const firstSaleProfit = averageSales * (margin / 100) - costPerAquisition;
    const profitPerCustomer = ltv - costPerAquisition;

    setResults([
      {
        type: 'main',
        title: '💵 Пороговый CPC',
        caption:
          'Вы можете увеличивать бюджет и охваты, повышая CPC до этого уровня, оставаясь прибыльными',
        value: formatPrice(porogCpc),
        unit: 'руб.',
        isInvalid: porogCpc < 0,
      },
      {
        type: 'main',
        title: '🎯 Пороговая стоимость заявки (CPA)',
        caption: 'Максимальная стоимость одной заявки, которую вы можете себе позволить',
        value: formatPrice(porogCpa),
        unit: 'руб.',
        isInvalid: porogCpa < 0,
      },
      {
        title: '👥 Количество посетителей',
        caption: 'Посещений сайта с учетом бюджета',
        value: formatNumber(users),
        unit: 'шт.',
        isInvalid: users < 0,
      },
      {
        title: '📩 Количество заявок (Leads)',
        caption: 'Заявок из формы обратной связи, звонков или других входящих обращений',
        value: formatNumber(leads),
        unit: 'шт.',
        isInvalid: leads < 1,
      },
      {
        title: '📉 Стоимость заявки (CPA)',
        caption:
          'Текущая стоимость заявки. Если она ниже порогового значения, то вы прибыльны и обязаны масштабироваться',
        value: formatPrice(cpa),
        unit: 'руб.',
        isInvalid: cpa < 0,
      },
      {
        title: '🛍 Количество клиентов (Buyers)',
        caption: 'Новых клиентов при выделенном бюджете',
        value: formatNumber(buyers),
        unit: 'шт.',
        isInvalid: buyers < 1,
      },
      {
        title: '🏷 Стоимость привлечения клиента (Cost Per Acquisition)',
        caption:
          'Во сколько вам обходится каждый новый клиент. Вы можете снижать ее, повышая качество обработки заявок',
        value: formatPrice(costPerAquisition),
        unit: 'руб.',
        isInvalid: costPerAquisition < 0,
      },
      {
        title: '💰 Выручка с клиента (Average Revenue Per User)',
        caption: 'Сколько платит вам клиент за весь его жизненный цикл',
        value: formatPrice(ltv),
        unit: 'руб.',
        isInvalid: ltv < 0,
      },
      {
        title: '📈 Общая выручка (Total Revenue)',
        caption: 'Для ее увеличения есть несколько шагов. Хотите знать каких?',
        value: formatPrice(totalRevenue),
        unit: 'руб.',
        isInvalid: totalRevenue < 0,
      },
      {
        title: '💡 Прибыль с первой продажи (1st Sale Profit)',
        caption: 'Часто, продавая в «минус» первый раз вы остаетесь прибыльными',
        value: formatPrice(firstSaleProfit),
        unit: 'руб.',
        isInvalid: firstSaleProfit < 0,
      },
      {
        title: '🔄 Прибыль с клиента (LTV)',
        caption: 'Ваш чистый заработок с одного клиента за весь его жизненный цикл',
        value: formatPrice(profitPerCustomer),
        unit: 'руб.',
        isInvalid: profitPerCustomer < 0,
      },
      {
        title: '📊 Общая прибыль (Total Profit)',
        caption: 'Ваш итоговый финансовый результат',
        value: formatPrice(totalProfit),
        unit: 'руб.',
        isInvalid: totalProfit < 0,
      },
    ]);
  }, [budget, cpc, cr1, cr2, averageSales, margin, retention, canCalculate]);

  return (
    <>
      <Form>
        <Form.Header>
          <Form.Title>Расчёт прогноза</Form.Title>
          <Form.Caption>
            Вставьте прогнозные значения и проверьте какой получите результат
          </Form.Caption>
        </Form.Header>
        {groups.map((group, index) => (
          <Form.Group title={group.title} key={index}>
            {group.fields.map((field) => (
              <Form.Field
                key={field.name}
                label={field.label}
                caption={field.caption}
                name={field.name}
                value={field.value}
                setValue={field.setValue}
                unit={field.unit}
              />
            ))}
          </Form.Group>
        ))}
      </Form>

      {results.length !== 0 && <Result groups={groups} results={results} />}
    </>
  );
};

export default Prognosis;
