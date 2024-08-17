import React, { useState, useRef } from 'react';

// css styles 
import inputStyles from '../../styles/Inputs.module.css';

// assets
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Cube from '../../../public/svgs/3dCube.svg';
import Image from 'next/image';

const DropdownInput = ({ options, selectedOption, handleSelectChange, name, icon }) => {
  const [filled, setFilled] = useState(false);
  const selectRef = useRef(null); // Create a ref for the select element

  const handleInputChange = (event) => {
    setFilled(event.target.value !== '');
  };

  const handleChange = (event) => {
    handleInputChange(event);
    const selectedValue = event.target.value;

    // Determine if the ID should be a number or a string
    const sampleOption = options[0];
    const parsedValue = typeof sampleOption.id === 'number' ? parseInt(selectedValue) : selectedValue;

    const selected = options.find(option => option.id === parsedValue);
    handleSelectChange(selected);
  };

  const handleIconClick = () => {
    if (selectRef.current) {
      selectRef.current.click(); // Simulate a click on the select element
      selectRef.current.focus(); // Also focus the element (for accessibility)
    }
  };

  return (
    <div className="flex relative w-[100%] h-12 rounded-xl">
      <span>
        <Image src={icon || Cube} alt="icon" className="absolute mt-3 mr-2 w-5" />
      </span>
      <select
        ref={selectRef}
        className={`${inputStyles.inputDropdown} ${filled ? inputStyles.inputFilledBorder : ''} w-full`} // Add right padding
        id="dropdown"
        value={selectedOption ? selectedOption.id : ''}
        onChange={handleChange}
      >
        <option value="" className='w-full bg-primaryDark'>{name}</option>
        {options?.map((option) => (
          <option key={option.id} value={option.id} className='bg-primaryDark hover:bg-primaryADarkHover'>{option.name}</option>
        ))}
      </select>
      <span onClick={handleIconClick} className="absolute left-3  h-full flex items-center pr-2 cursor-pointer pointer-events-none">
        <ArrowBackIosNewIcon sx={{ transform: 'rotate(-90deg)' }} />
      </span>
    </div>
  );
};

export default DropdownInput;
