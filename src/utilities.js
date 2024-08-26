import _ from 'lodash';

/**
 * Возвращает ссылку для набора номера телефона.
 *
 * @param {string} phone - Номер телефона.
 * @returns {string} - Ссылка для набора номера телефона. Пример: 'tel:+375291234567'.
 */
export const getPhoneHref = (phone) => `tel:${phone.replace(/[^+\d]/g, '')}`;

/**
 * Форматирует число в цену в формате '1 2345,67'
 *
 * @param {number} number Число для форматирования
 * @returns {string} Отформатированное число в формате цены
 */
export const formatPrice = (number) => {
  const formattedNumber = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

  return formattedNumber;
};

/**
 * Возвращает слово из массива `words` в зависимости от числа `count`.
 *
 * @param {number} count - Число, для которого нужно определить слово.
 * @param {string[]} words - Массив слов. Первое слово соответствует числу 1, второе - числу 2, третье - числу 5.
 * @returns {string} - Слово из массива `words` в зависимости от числа `count`.
 */
export const getCountWord = (count, words) => {
  const options = [2, 0, 1, 1, 1, 2];
  const moduledCount = Math.abs(count);

  return Number.isInteger(moduledCount)
    ? words[
      moduledCount % 100 > 4 && moduledCount % 100 < 20
        ? 2
        : options[moduledCount % 10 < 5 ? moduledCount % 10 : 5]
    ]
    : words[1];
};

/**
 * Получает значение параметра из URL.
 *
 * @param {string} name - Имя параметра.
 * @param {string} href - URL, из которого нужно получить параметр. По умолчанию используется текущий URL.
 * @returns {string|null} - Значение параметра или null, если параметр не найден.
 */
export const getUrlParam = (name, href = window.location.href) => {
  const url = new URL(href);
  const params = new URLSearchParams(url.search);
  return params.get(name);
};

/**
 * Устанавливает параметр URL.
 *
 * @param {string} name - Имя параметра.
 * @param {string} value - Значение параметра.
 * @param {string} href - URL, в котором нужно установить параметр. По умолчанию используется текущий URL.
 * @returns {URL} - Новый URL с обновленным параметром.
 */
export const setUrlParam = (name, value, href = window.location.href) => {
  if (!name) return href;

  const url = new URL(href);
  const params = new URLSearchParams(url.search);

  if (!value) {
    params.delete(name);
  } else {
    params.set(name, value);
  }

  const newUrl = new URL(`${url.origin}${url.pathname}`);
  params.forEach((paramValue, paramName) => {
    newUrl.searchParams.append(paramName, paramValue);
  });

  return newUrl;
};

/**
 * Прокручивает к указанному элементу.
 *
 * @param {HTMLElement|string} element - Элемент или селектор элемента, к которому нужно прокрутить.
 * @param {Object} [options={}] - Дополнительные параметры для прокрутки. Подробнее: https://developer.mozilla.org/ru/docs/Web/API/Element/scrollIntoView
 * @param {string} [options.behavior='smooth'] - Определяет тип прокрутки.
 * @param {string} [options.block='start'] - Определяет вертикальное выравнивание элемента относительно контейнера прокрутки.
 * @param {string} [options.inline='nearest'] - Определяет горизонтальное выравнивание элемента относительно контейнера прокрутки.
 */
export const scrollToElement = (element, options = {}) => {
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

/**
 * Обработка клика вне элементов.
 * @param {Function} callback - функция, которая будет вызвана при клике вне элементов
 * @param {...HTMLElement|string} elements - элементы, клик на которые не будет вызывать callback
 */
export const outsideClick = (callback, ...elements) => {
  const handleClickOutside = (event) => {
    let isOutsideClick = true;
    elements
      .map((element) => (_.isString(element) ? document.querySelectorAll(element) : element))
      .flatMap((element) => {
        const isNodeList = Object.prototype.isPrototypeOf.call(NodeList.prototype, element);
        return isNodeList ? Array.from(element) : element;
      })
      .filter(Boolean)
      .forEach((element) => {
        if (element && element.contains(event.target)) {
          isOutsideClick = false;
        }
      });
    if (isOutsideClick) callback(event);
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
};

/**
 * Отключает прокрутку страницы.
 * Добавляет класс к `html`, чтобы избежать сдвига контента.
 * Компенсирует ширину скролла.
 *
 * @param {string} [htmlClass] - Класс, который добавляется к `html`.
 */
export const disableScroll = () => {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.width = '100px';
  scrollDiv.style.height = '100px';
  scrollDiv.style.overflow = 'scroll';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';

  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  document.querySelector('html').style.overflow = 'clip';
  document.querySelector('html').style.paddingRight = `${scrollbarWidth}px`;
};

/**
 * Включает прокрутку страницы.
 * Удаляет класс из `html`.
 * Убирает компенсацию ширины скролла.
 *
 * @param {string} [htmlClass] - Класс, который удаляется из `html`.
 */
export const enableScroll = () => {
  document.querySelector('html').style.overflow = '';
  document.querySelector('html').style.paddingRight = '';
};
