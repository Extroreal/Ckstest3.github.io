import React from 'react';
import Under from '../Under/Under';

const FormTitle = ({ children }) => (
  <div className="form__title _h1">
    <Under>{children}</Under>
  </div>
);

export default FormTitle;
