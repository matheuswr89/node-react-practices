import React, { InputHTMLAttributes } from 'react';

import './styles.css';
import InputMask from "react-input-mask";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  useMask?: boolean
}

const Input: React.FC<InputProps> = ({ label, name, useMask, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      {!useMask ? <input type="text" id={name} {...rest} /> :
        <InputMask className="input-block" mask="(99) 9 9999-9999" {...rest} />
      }

    </div>
  );
}

export default Input;