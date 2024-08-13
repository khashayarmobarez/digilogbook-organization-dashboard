'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import rightArrowButton from '../../../public/svgs/Right Arrow Button.svg';
import Image from 'next/image';

interface PageTitleProps {
  title: string;
  navigateTo?: string;
  doesBackButtonExists?: boolean;
}

export default function PageTitle({ title, navigateTo, doesBackButtonExists }: PageTitleProps) {
  const router = useRouter();

  const handleNavigation = () => {
    if (navigateTo) {
      router.push(navigateTo);
    } else {
      router.back();
    }
  };

  return (
    <div className="sticky top-6 md:top-2 z-30 bg-primaryDarkHover w-full h-20 md:h-32 flex justify-center items-end py-2 rounded-b-2xl">
      <p className="text-base font-medium">{title}</p>
      {
        doesBackButtonExists === false ?
        ''
        :
        <Image
          src={rightArrowButton}
          alt="rightArrowButton"
          onClick={handleNavigation}
          className='absolute left-4 w-8 h-8 transform rotate-180'
        />
      }
    </div>
  );
}


// <PageTitle title="پنل انجمن" DoesBackButtonExists={false} navigateTo={''} />