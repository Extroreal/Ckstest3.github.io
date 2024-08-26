import { useContext, useEffect } from 'react';
import { outsideClick } from '../utilities.js';
import { AppContext } from '../contexts/AppContext.jsx';

/**
 * Обработка клика вне элементов.
 * @param {Array} deps - зависимости для useEffect
 * @param {Function} callback - функция, которая будет вызвана при клике вне элементов
 * @param {...HTMLElement|string} elements - элементы, клик на которые не будет вызывать callback
 */
export const useOutsideClick = (callback = (e) => e, ...elements) => {
  useEffect(() => outsideClick(callback, ...elements), []);
};
export const useApp = () => useContext(AppContext);
