'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// styles
import ButtonStyles from '@/styles/Buttons.module.css';

// query and apis
import { useLogin } from '@/api/authentication';

// utilities
import { showToast } from '@/utils/toastNotify';

// comps
import PhoneOrEmailInput from '@/components/inputs/PhoneOrEmailInput';
import PageTitle from '@/components/reusable comps/PageTitle';
import PasswordInput from '@/components/inputs/PasswordInput';
import Checkbox from '@/components/inputs/CheckBox';

export default function LoginPage() {

  const router = useRouter();
  
  const [userInput, setUserInput] = useState('');
  const [userInputFocus, setUserInputFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [pwdFocus, setPwdFocus] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // 'UseMutationResult<any, Error, LoginPostData, unknown>'
  const { mutate: login } = useLogin();

  useEffect(() => {
      const token = Cookies.get('token');

      if (token) {
          router.push('/dashboard'); 
      }
  }, []);

  useEffect(() => {
    const savedRememberMe = Cookies.get('rememberMe') === 'true';
    const savedUsername = Cookies.get('username') || '';
    const savedPwd = Cookies.get('password') || '';
    setRememberMe(savedRememberMe);
    setUserInput(savedUsername);
    setPwd(savedPwd)
  }, []);


  const handleTermsToggle = (isChecked: boolean) => {
      setRememberMe(isChecked);
  };

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!userInput || !pwd) {
      showToast('لطفا فیلد های خالی را پر کنید', 'error');
      return;
    }

    setIsLoading(true);

    const reqBody = {
      username: userInput,
      password: pwd,
      rememberMe: rememberMe 
    }

    login(reqBody, {

      onSuccess: (data) => {

        console.log(data);
        showToast('ورود موفقیت آمیز بود', 'success');

        Cookies.set('token', data.data.token);

        if(rememberMe === true) {
          Cookies.set('rememberMe', 'true');
          Cookies.set('username', userInput);
          Cookies.set('password', pwd);
        }

        router.push('/dashboard');
        setIsLoading(false);
      },

      onError: (error: any) => {
        let errorMessage = 'خطایی رخ داده است';
        if ((error as any).response && (error as any).response.data && (error as any).response.data.ErrorMessages) {
          errorMessage = (error as any).response.data.ErrorMessages[0].ErrorMessage;
        }
        showToast(errorMessage, 'error');
        setIsLoading(false);
      }

    });
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
            isChecked={rememberMe}
            onToggle={handleTermsToggle} 
          />

          <button type="submit" className={`${ButtonStyles.addButton} w-36 self-center `}
          onClick={handleLoginSubmit} 
          disabled={!userInput || !pwd || isLoading ? true : false}
          >                                                                                                                                                                                                                                                                                         
               {isLoading ?
                  <span className="loading loading-spinner loading-md text-primaryADarkHover"></span>
                  : 
                  <>
                      تایید
                  </>
                } 
          </button>
          
        </form>                                                                                                                                                                                                                                                           <p className=' absolute -z-10 text-[#000000]/0'>front end developed by khashayar mobarez</p>

      </div>                                                                                                                                                                                                                                                                                                                                                                                           <p className=' absolute -z-10 text-[#000000]/0'>front end developed by khashayar mobarez</p>
    </div>
  );
}