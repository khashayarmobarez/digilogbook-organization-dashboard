import React from 'react';


const usersLayout = ({ children }) => {
    return (
        <div className="w-full">
            <main>{children}</main>
        </div>
        );
    };
  
export default usersLayout;