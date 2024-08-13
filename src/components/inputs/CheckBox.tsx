import React, { FC } from 'react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

interface CheckboxProps {
    label: string;
    isChecked: boolean;
    onToggle: (isChecked: boolean) => void;
  }

const Checkbox: FC<CheckboxProps> = ({ label, isChecked, onToggle }) => {

  const toggleCheckbox = () => {
    onToggle(!isChecked); // Pass the new checked state to the parent component
  };

  return (
    <div className=' flex px-2 gap-x-4 items-center'  onClick={toggleCheckbox}>
      <div className={`w-6 h-6 border-2 border-accentColorNormal rounded flex items-center justify-center cursor-pointer`}>
        {isChecked && < CheckRoundedIcon />}
      </div>
      <div className=" underline underline-offset-4 cursor-pointer" >{label}</div>
    </div>
  );
};

export default Checkbox;
