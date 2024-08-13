import React, { useState, useEffect } from 'react';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import inputStyles from '../../styles/Inputs.module.css';

const PHONE_REGEX = /^09\d{9}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface PhoneOrEmailInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  focus?: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

export default function PhoneOrEmailInput({ onChange, value, focus, onFocus, onBlur }: PhoneOrEmailInputProps) {
  const [inputFocus, setInputFocus] = useState(false);
  const [validInput, setValidInput] = useState(false);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const isValidPhone = PHONE_REGEX.test(value);
    const isValidEmail = EMAIL_REGEX.test(value);
    setValidInput(isValidPhone || isValidEmail);
  }, [value]);

  const persianToEnglishNumber = (input: string): string => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    return input.replace(/[\u06F0-\u06F9]/g, (char) => {
      return englishNumbers[persianNumbers.indexOf(char)];
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = persianToEnglishNumber(event.target.value);
    onChange({ ...event, target: { ...event.target, value: newValue } });
    setFilled(newValue.trim() !== '');
  };

  return (
    <div className='flex flex-col relative w-full rounded-xl px-2'>
      <div className='flex w-full h-12'>
        <span>
          {!EMAIL_REGEX.test(value) ? (
            <LocalPhoneRoundedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
          ) : (
            <EmailRoundedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
          )}
        </span>
        <input
          type="text"
          id="phoneOrEmail"
          autoComplete='on'
          value={value}
          onChange={handleInputChange}
          required
          aria-invalid={validInput ? "false" : "true"}
          aria-describedby="inputnote"
          onFocus={() => {
            setInputFocus(true);
            onFocus();
          }}
          onBlur={() => {
            setInputFocus(false);
            onBlur();
          }}
          className={`${inputStyles.inputText} ${filled ? inputStyles.inputFilledBorder : ''} w-[100%] pr-8`}
          placeholder="ایمیل یا شماره موبایل"
        />
      </div>
      <p id="inputnote" className={`${value && !validInput && filled ? "instructions" : "hidden"} mt-2 text-right`}
      style={{color:'var(--notification-red)'}}>
        <InfoOutlinedIcon sx={{marginLeft:'5px'}} /> نام کاربری معتبر نمی باشد
      </p>
    </div>
  );
}