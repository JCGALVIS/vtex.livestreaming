import React from 'react';
import style from '../styles.module.css';

declare interface Props {
  checked?: boolean;
  id?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[];
  disabled?: boolean;
  label?: string;
}

export const Radio = ({
  checked,
  id,
  name,
  onChange,
  value,
  disabled,
  label,
}: Props) => {
  return (
    <div className={style.container}>
      <input
        type="radio"
        checked={checked}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
        className={style.radio}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
