import React, { createContext, useState } from 'react';

// Создаём контекст для настройки статических данных приложения.
// Добавляем описание всех данных.

export const AppContext = createContext({
  calcType: null,
  setCalcType: () => {},
  formatPrice: () => {},
  formatNumber: () => {},
  scrollToElement: () => {},
});

// Создаём провайдер, который будет оборачивать приложение и прокидывать данные в контекст.

const AppProvider = ({ children }) => {
  const [calcType, setCalcType] = useState(null);

  const formatPrice = (number) => {
    if (!number) return '0,00';
    const formattedNumber = new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);

    return formattedNumber;
  };

  const formatNumber = (number) => {
    if (!number) return 0;
    const formattedNumber = new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(number);
    return formattedNumber;
  };

  const scrollToElement = (element, options = {}) => {
    if (!element) return;
    element = element instanceof HTMLElement ? element : document.querySelector(element);
    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
      ...options,
    });
  };

  // Передаём данные в контекст.
  return (
    <AppContext.Provider
      value={{
        calcType,
        setCalcType,
        formatPrice,
        formatNumber,
        scrollToElement,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
