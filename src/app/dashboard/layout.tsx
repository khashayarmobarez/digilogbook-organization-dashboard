import React from 'react';

interface DashboardLayoutProps {
    children: React.ReactNode;
}


const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="w-full">
            <main>{children}</main>
        </div>
        );
    };
  
export default DashboardLayout;