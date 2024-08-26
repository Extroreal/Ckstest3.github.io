import React from 'react';
import { Input } from 'qmedia-ui';

const FormField = ({ label, name, value, unit, caption, funnelLvl, setValue = (val) => val }) => (
  <div className="form__field">
    {label && (
      <div className="form__field-label _h6">
        {funnelLvl && `${funnelLvl}. `}
        {label}
      </div>
    )}
    {caption && <div className="form__field-caption">{caption}</div>}
    <div className="form__field-row">
      <Input
        className="form__field-input"
        name={name}
        value={String(value)}
        placeholder="0"
        size="small"
        type="number"
        inputMode="decimal"
        onBlur={(e) => {
          if (e.target.value === '') {
            setValue('');
            return;
          }
          const numberValue = Number(e.target.value);
          setValue(numberValue);
        }}
      />
      {unit && <div className="form__field-unit">{unit}</div>}
    </div>
  </div>
);

export default FormField;
