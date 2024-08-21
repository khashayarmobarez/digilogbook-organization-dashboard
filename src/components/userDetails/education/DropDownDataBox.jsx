import React, { useState } from 'react';

// styles
import containers from '@/styles/Containers.module.css'

import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const DropDownDataBox = (props) => {

    const{ title, data } = props

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
    <div className='flex flex-col gap-y-3'>

        <div onClick={toggleExpanded} className={`${containers.Container2} rounded-2xl flex w-full h-12 items-center justify-between px-3 border-2 border-opacity-50
        ${isExpanded ? 'border-accentColorNormal' : 'border-mainTextColor'}
        ${isExpanded ? 'text-accentColorNormal' : 'text-mainTextColor'}`}>

            <div className='flex' >
                <span> 
                    <InsertDriveFileOutlinedIcon sx={{ position: 'relative' }} />
                </span>
                <h3 className='text-base'>{title}</h3>
            </div>

            <div className='flex gap-x-3 justify-center'>
                <span className={`transition-transform duration-300 transform ${isExpanded ? 'rotate-90 mt-2' : 'rotate-[-90deg] mt-[-10px]'}`}>
                    <ArrowBackIosIcon />
                </span>
            </div>

        </div>

        {
            data && isExpanded &&
            data.map((data) => (
                <div key={data.id} className='w-full flex justify-start gap-x-8 px-6 h-12 items-center rounded-2xl bg-[#1b253B]'>
                    <p className={`${isExpanded ? 'block' : 'hidden'}`} >{data.order}</p>
                    <p className={`${isExpanded ? 'block' : 'hidden'} text-xs`} >{data.description}</p>
                </div>
            ))

        }

    </div>
    );
};

export default DropDownDataBox;