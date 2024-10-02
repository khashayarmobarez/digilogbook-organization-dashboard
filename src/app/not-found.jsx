import React from 'react';
import Image from 'next/image';

import notfoundAnimation from '@/../public/animations/oops-404-error-with-a-broken-robot-animate.svg'

const NotFound = () => {
    return (
        <div className='w-full flex flex-col h-[100dvh] justify-center items-center text-2xl pt-10'>
            <p>صفحه مورد نظر یافت نشد || 404</p>
            {/* <Image src={notfoundAnimation} alt='not found animation' /> */}
        </div>
    );
};

export default NotFound;