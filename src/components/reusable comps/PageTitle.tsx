import React from 'react';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIcon';

interface PageTitleProps {
  title: string;
  navigateTo?: string;
}

export default function PageTitle({ title, navigateTo }: PageTitleProps) {
  const router = useRouter();

  const handleNavigation = () => {
    if (navigateTo) {
      router.push(navigateTo);
    } else {
      router.back();
    }
  };

  return (
    <div className="sticky top-6 md:top-2 z-30 bg-primaryDarkHover w-[90%] h-20 md:h-32 flex justify-center items-end py-2 rounded-b-2xl">
      <p className="text-base font-medium">{title}</p>
      <ArrowBackIcon
        onClick={handleNavigation}
        sx={{
          position: 'absolute',
          left: '1rem',
          width: '24px',
          height: '24px',
          padding: '0px',
          backgroundColor: '',
          borderRadius: '10rem',
          background: 'linear-gradient(195.31deg, #353A65 -84.63%, rgba(42, 46, 81, 0) 100.99%)',
          boxShadow: '-3px 4px 5.8px 5px rgba(0, 0, 0, 0.27), 3px -4px 4px 0px rgba(179, 170, 170, 0.18)',
        }}
      />
    </div>
  );
}