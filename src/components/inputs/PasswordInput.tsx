import React, { FC, useState } from 'react';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Image from 'next/image';

// Assets and Styles
import keyIcon from '../../../public/svgs/key-Icon.svg';
import inputStyles from '../../styles/Inputs.module.css';

interface PasswordInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  focus?: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

const PasswordInput: FC<PasswordInputProps> = ({ onChange, value, focus, onFocus, onBlur }) => {
  const [pwdFocus, setPwdFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [filled, setFilled] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`${inputStyles['password-input']} flex relative w-full h-12 px-2`} data-testid="password">
      <span style={{ color: 'var(--disabled-button-text)' }}>
        <Image  src={keyIcon} alt="icon" className="absolute mt-4 mr-2" />
      </span>
      <input
        type={showPassword ? 'text' : 'password'}
        id="password"
        value={value}
        onChange={(e) => {
          onChange(e);
          setFilled(e.target.value.trim() !== '');
        }}
        className={`${inputStyles.inputText} ${filled ? inputStyles.inputFilledBorder : ''} w-[100%] pr-8`}
        required
        aria-describedby="pwdnote"
        onFocus={() => {
          setPwdFocus(true);
          onFocus();
        }}
        onBlur={() => {
          setPwdFocus(false);
          onBlur();
        }}
        placeholder="رمز عبور"
        autoComplete="new-password"
      />
      <span onClick={togglePasswordVisibility} className='text-[#cacaca]'>
        {showPassword ? (
          <RemoveRedEyeOutlinedIcon sx={{ position: 'absolute', top: '0.8rem', left: '1rem' }} />
        ) : (
          <VisibilityOffOutlinedIcon sx={{ position: 'absolute', top: '0.8rem', left: '1rem' }} />
        )}
      </span>
    </div>
  );
};

export default PasswordInput;
