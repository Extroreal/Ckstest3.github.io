import './styles/index.css';
import React, { useEffect, useRef } from 'react';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import classNames from 'classnames';
import { useApp } from '../../hooks';

const Result = ({ groups, results }) => {
  const { scrollToElement } = useApp();
  const ref = useRef(null);

  useEffect(() => {
    WebApp.MainButton.setParams({
      text: 'Сохранить расчёт',
      color: '#53bd35',
      text_color: '#ffffff',
    });
    const chatId = WebApp.initDataUnsafe?.user?.id;

    if (chatId) {
      WebApp.MainButton.show();
    }

    scrollToElement(ref.current);

    return () => {
      WebApp.MainButton.hide();
    };
  }, []);

  useEffect(() => {
    if (!results || results?.length === 0) return;

    WebApp.offEvent('mainButtonClicked');
    WebApp.onEvent('mainButtonClicked', () => {
      const resultMessage = [];

      resultMessage.push('<b>ИСХОДНЫЕ ДАННЫЕ</b>');
      resultMessage.push('\n<i>показатели рекламной кампании и бизнес-модели</i>');
      resultMessage.push('\n\n---------');

      groups.forEach((group) => {
        resultMessage.push(`\n\n<b>${group.title}:</b>`);
        group.fields.forEach((field) => {
          resultMessage.push(`\n\n${field.label}`);
          resultMessage.push(`<blockquote>${field.caption}</blockquote>`);
          resultMessage.push(`‣ ${field.formattedValue} ${field.unit}`);
        });
      });

      resultMessage.push('\n\n---------');
      resultMessage.push('\n\n<b>ОТЧЁТ ПО UNIT-ЭКОНОМИКЕ</b>');
      resultMessage.push('\n<i>показатели, рассчитанные на основании исходных данных</>');
      resultMessage.push('\n\n---------');

      results.forEach((result) => {
        resultMessage.push(`\n\n<b>${result.title}</b>`);
        resultMessage.push(`<blockquote>${result.caption}</blockquote>`);
        resultMessage.push(
          `${result.isInvalid ? '❌' : '✅'} ${result.formattedValue} ${result.unit}`,
        );
      });

      resultMessage.push('\n\n---------');
      resultMessage.push(
        '\n\n📩 Если у вас возникли вопросы или вы хотите оптимизировать свою маркетинговую стратегию, обратитесь за консультацией @qmediaby.\n\n<i>Мы поможем улучшить ваши результаты!</i>',
      );

      const chatId = WebApp.initDataUnsafe?.user?.id;
      const botToken = process.env.TELEGRAM_BOT_TOKEN;

      if (chatId && botToken) {
        axios.get(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          params: {
            chat_id: chatId,
            text: resultMessage.join(''),
            parse_mode: 'HTML',
          },
        });

        WebApp.close();
      }
    });
  }, [results]);

  return (
    <div className="result" ref={ref}>
      <div className="result__header">
        <div className="result__title _h1">Рассчитанные показатели</div>
      </div>

      <div className="result__grid">
        {results.map(({ title, caption, formattedValue, isInvalid, unit, type }, index) => (
          <div
            className={classNames(
              'result__item',
              type === 'main' && 'result__item--main',
              isInvalid && 'result__item--invalid',
            )}
            key={index}
          >
            {title && <div className="result__item-title _h4">{title}</div>}
            {caption && <div className="result__item-caption">{caption}</div>}
            <div className="result__item-footer">
              <div className="result__item-value">{formattedValue}</div>
              {unit && <div className="result__item-unit">{unit}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
