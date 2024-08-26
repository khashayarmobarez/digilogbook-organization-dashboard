import React, { useState } from 'react';

// styles
import containers from '@/styles/Containers.module.css'

// mui
import CheckIcon from '@mui/icons-material/Check';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const DropDownSyllabiData = (props) => {

    const{title, data, percent} = props

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
    <div className='flex flex-col gap-y-3'>

        <div onClick={toggleExpanded} className={` w-full h-12 flex items-center justify-between px-4 border-2 border-opacity-50 rounded-2xl 
        hover:text-accentColorNormal hover:border-accentColorNormal
        ${isExpanded ? 'border-accentColorNormal text-accentColorNormal' : 'border-primaryLightHover text-primaryLightHover'}`}>

            <div className='flex' >
                <span> 
                    <InsertDriveFileOutlinedIcon sx={{ position: 'relative' }} />
                </span>
                <h3 className='text-base'>{title}</h3>
            </div>

            <div className='flex gap-x-3 justify-center'>
                {percent !== null && <p className={`${isExpanded && 'mt-2'} text-xs`}>{percent}%</p>}
                <span className={`transition-transform duration-300 transform ${isExpanded ? 'rotate-90 mt-2' : 'rotate-[-90deg] mt-[-10px]'}`}>
                    <ArrowBackIosIcon />
                </span>
            </div>

        </div>

        {
            data && isExpanded &&
            data.map((data, index) => (
                <div className={`${isExpanded ? 'block' : 'hidden'} flex justify-between items-center px-4 py-2 rounded-2xl bg-[#1B253B]`}
                key={data.id}>
                    <p className={` text-center self-center`} >{index + 1}</p>
                    <p className={` text-center self-center text-sm`} >{data.description}</p>
                    {
                        data.percent === 100 ?
                        <CheckIcon sx={{color:'var(--accent-color-normal)', width:'1.2rem', height:'1.2rem'}} />
                        :
                        <p className={` text-center self-center text-sm`} >{data.percent}%</p>

                    }
                </div>
            ))

        }

    </div>
    );
};

export default DropDownSyllabiData;