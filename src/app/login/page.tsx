'use client'
import React, { useState } from 'react';

// comps
import PhoneOrEmailInput from '@/components/inputs/PhoneOrEmailInput';
import PageTitle from '@/components/reusable comps/PageTitle';

export default function LoginPage() {

  const [userInput, setUserInput] = useState('');
  const [userInputFocus, setUserInputFocus] = useState(false);
  const [validUserInput, setValidUserInput] = useState(false);

  return (
    <div className="flex flex-col w-full items-center min-h-screen pt-16">
      <div className='w-[90%] md:w-[70%] lg:w-[50%] flex flex-col gap-y-8 '>

        <PageTitle title="پنل انجمن" />

        <form>

        <PhoneOrEmailInput 
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput} 
          focus={userInputFocus}
          onFocus={() => setUserInputFocus(true)} 
          onBlur={() => setUserInputFocus(false)} 
        />
          
        </form>

      </div>
    </div>
  );
}