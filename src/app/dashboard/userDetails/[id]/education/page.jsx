import React from 'react';

// styles
import GradientStyles from '@/styles/Containers.module.css';

// comps
import SmallerPageTitle from '@/components/reusable comps/SmallerPageTitle';

const page = () => {
    return (
        <div className={`${GradientStyles.darkMainContainer} w-full rounded-2xl flex flex-col items-center`}>
            <div className='flex flex-col items-center w-[90%] pb-10'>
                
                <SmallerPageTitle title='جزئیات دوره' />

            </div>
        </div>
    );
};

export default page;