import React from 'react';

// comps
import SideMenu from '@/components/dashboard/sideMenu/SideMenu';

interface DashboardLayoutProps {
    children: React.ReactNode;
}


const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="w-full">
            <SideMenu />
            <main>{children}</main>
        </div>
        );
    };
  
export default DashboardLayout;