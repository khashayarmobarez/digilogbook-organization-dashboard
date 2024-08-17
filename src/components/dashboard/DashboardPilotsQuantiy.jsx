import React, { PureComponent } from 'react';
import { BarChart, Bar, LabelList, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// styles
import buttons from '@/styles/Buttons.module.css'

// components
import SearchInput from '../../components/inputs/SearchInputWithDropdown'

// Custom bar shape function to make the top of the bar rounded
const RoundedBar = (props) => {
    const { fill, x, y, width, height } = props;
    const radius = 20; // Adjust the radius to control the roundness of the corners
    return (
        <>
        <g>
            <path d={`
            M${x},${y + radius}
            Q${x},${y},${x + radius},${y}
            L${x + width - radius},${y}
            Q${x + width},${y},${x + width},${y + radius}
            L${x + width},${y + height - radius}
            Q${x + width},${y + height},${x + width - radius},${y + height}
            L${x + radius},${y + height}
            Q${x},${y + height},${x},${y + height - radius}
            Z
            `} fill={fill}/>
            {/* Add a semi-transparent rectangle behind the bar */}
            <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill="rgba(0, 0, 0, 0.14)" // Semi-transparent black color
            />
        </g>
        </>
    );
  };


const DashboardPilotsQuantiy = ({data}) => {

    const filteredData = data?.levels?.filter(level => level.userCounts > 0);

    return (
        <div className='flex justify-center w-full min-h-20 rounded-2xl px-5 py-7 my-4 gap-x-6' style={{backgroundColor:'var(--organs-coachData-bg)', boxShadow:'var(--organs-coachData-boxShadow)'}}>
            
            <div className=' flex flex-col w-full items-center space-y-6'>

                        <div className='w-full flex justify-start text-xl text-accentColorNormal' >
                            <p>{data && data.organizationName}</p>
                        </div>

                        <div className='w-full flex flex-col items-center justify-center'>

                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart width={150} height={40} data={filteredData}>
                                    <Bar dataKey="userCounts" fill='var(--accent-color-normal)' shape={<RoundedBar />} >
                                        <LabelList dataKey="userCounts" position="insideTop" style={{ fill: '#3B444B', fontWeight:'500' }}  />
                                    </Bar> 
                                </BarChart>
                            </ResponsiveContainer>

                            <div className='w-[100%] h-[6px] mt-[-0.6rem] z-10' style={{ backgroundColor: '#1b253B'}}></div>

                            <div className='w-full flex items-center justify-around px-1 md:px-10'>
                                {
                                   data && filteredData.map(level => <p key={level.id}>{level.name}</p>)
                                }
                            </div>

                        </div>

            </div>

        </div>
    );
};

export default DashboardPilotsQuantiy;
