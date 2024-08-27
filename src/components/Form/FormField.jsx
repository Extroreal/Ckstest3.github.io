import React, { useState } from 'react';
import { Input } from 'qmedia-ui';

const FormField = ({ label, name, value, unit, caption, funnelLvl, setValue = (val) => val }) => {
  const [isInvalid, setIsInvalid] = useState(false);

  return (
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
          inputMode="decimal"
          isInvalid={isInvalid}
          onBlur={(e) => {
            setIsInvalid(false);

            if (e.target.value === '') {
              setValue('');
              return;
            }
            const numberValue = Number(e.target.value.replace(',', '.'));

            if (Number.isNaN(numberValue) || numberValue < 0) {
              setIsInvalid(true);
              return;
            }

            setValue(numberValue);
          }}
        />
        {unit && <div className="form__field-unit">{unit}</div>}
      </div>
      {isInvalid && <div className="form__field-error">Введите корректное значение</div>}
    </div>
  );
};

export default FormField;
