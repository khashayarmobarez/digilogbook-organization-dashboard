
'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import inputStyles from '../../styles/Inputs.module.css';
import containers from '../../styles/Containers.module.css';

const SearchInput = ({ onSearch, name, icon, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex relative w-full h-12">
        {
        icon &&
        <span className='z-10'>
            <Image src={icon} alt="icon" className="absolute mt-3 ml-3 w-5" />
        </span>
        }
        <input
            type="text"
            className={`${inputStyles.inputText} ${searchTerm ? inputStyles.inputFilledBorder : ''} placeholder-text-color w-full pl-10 pr-4`}
            placeholder={name}
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
        />
        <button
            disabled={isLoading || false}
            onClick={handleSearch}
            className={`absolute left-0 top-0 h-full px-4 text-white rounded-l-xl transition-colors duration-200
            ${containers.container2} ${isLoading && 'backdrop-blur-md'} hover:bg-accentColorNormal`}
        >
            <SearchIcon />
        </button>
    </div>
  );
};

export default SearchInput;