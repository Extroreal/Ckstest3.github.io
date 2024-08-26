import React from 'react';

const FormGroup = ({ title, children }) => (
  <div className="form__group">
    {title && <div className="form__group-title _h3">{title}</div>}
    {children}
  </div>
);

export default FormGroup;
