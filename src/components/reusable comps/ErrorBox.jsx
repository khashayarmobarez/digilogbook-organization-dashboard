import React from 'react';

const ErrorBox = ({errorText}) => {
    return (
        <div className="w-full md:w-5/12 mockup-code bg-primaryANomral text-accentColorNormalHover">
            <pre className='pl-4 flex justify-end'><code className='text-wrap '>{errorText}</code></pre>
        </div>
    );
};

export default ErrorBox;