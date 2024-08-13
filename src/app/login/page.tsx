'use client'
import React, { useState } from 'react';

// styles
import ButtonStyles from '../../styles/Buttons.module.css';

// query and apis
import { useLogin } from '@/api/authentication';

// comps
import PhoneOrEmailInput from '@/components/inputs/PhoneOrEmailInput';
import PageTitle from '@/components/reusable comps/PageTitle';
import PasswordInput from '@/components/inputs/PasswordInput';
import Checkbox from '@/components/inputs/CheckBox';
import { showToast } from '@/utils/toastNotify';

export default function LoginPage() {

  const [userInput, setUserInput] = useState('');
  const [userInputFocus, setUserInputFocus] = useState(false);
  // const [validUserInput, setValidUserInput] = useState(false);

  const [pwd, setPwd] = useState('');
  const [pwdFocus, setPwdFocus] = useState(false);

  const [termsChecked, setTermsChecked] = useState(false);

  const { mutate: login, isLoading, isError, isSuccess, error } = useLogin();


  const handleTermsToggle = (isChecked: boolean) => {
      setTermsChecked(isChecked);
  };

  const handleLoginSubmit = async () => {
    if (!userInput || !pwd) {
      showToast('لطفا فیلد های خالی را پر کنید', 'error');
      return;
    }
    if (!termsChecked) {
      showToast('لطفا تیک مرا به خاطر بسپار را بزنید', 'error');
      return;
    }

    login({ username: userInput, password: pwd, rememberMe: termsChecked });
  }

  return (
    <div className="flex flex-col w-full items-center min-h-screen pt-16">
      <div className='w-[90%] md:w-[70%] lg:w-[50%] flex flex-col gap-y-10 '>

        <PageTitle title="پنل انجمن" doesBackButtonExists={false} />

        <form className='w-full flex flex-col gap-y-6'>

          <PhoneOrEmailInput 
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput} 
            focus={userInputFocus}
            onFocus={() => setUserInputFocus(true)} 
            onBlur={() => setUserInputFocus(false)} 
          />

          <PasswordInput
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              focus={pwdFocus}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
          />

          <Checkbox
            label="مرا به خاطر بسپار" 
            isChecked={termsChecked}
            onToggle={handleTermsToggle} 
          />

          <button type="submit" className={`${ButtonStyles.addButton} w-36 self-center `}
          onClick={handleLoginSubmit} 
          // disabled={!userInput || !pwd || submitLoading ? true : false}
          >
              {/* {submitLoading ?
                  <span className="loading loading-spinner loading-lg"></span>
                  : */}
                  <>
                      تایید
                  </>
              {/* } */}
          </button>
          
        </form>

      </div>
    </div>
  );
}