import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';
import {useForm} from '../hooks/FormHooks';
import {RegisterCredentials} from '../types/LocalTypes';

const RegisterForm = () => {
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);
  const {postRegister, getEmailAvailable, getUsernameAvailable} = useUser();
  const initValues: RegisterCredentials = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async () => {
    try {
      const registerResult = await postRegister(inputs as RegisterCredentials);
      console.log('doLogin result', registerResult);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doRegister,
    initValues,
  );

  useEffect(() => {
    const checkUsernameAvailability = async () => {
      try {
        if (inputs.username.length > 2) {
          const result = await getUsernameAvailable(inputs.username);
          setUsernameAvailable(result.available);
        } else {
          setUsernameAvailable(true);
        }
      } catch (error) {
        console.error((error as Error).message);
        setUsernameAvailable(true);
      }
    };

    checkUsernameAvailability();
  }, [inputs.username, getUsernameAvailable]);

  useEffect(() => {
    const checkEmailAvailability = async () => {
      try {
        if (inputs.email.length > 5) {
          const result = await getEmailAvailable(inputs.email);
          setEmailAvailable(result.available);
        } else {
          setEmailAvailable(true);
        }
      } catch (error) {
        console.error((error as Error).message, 'mörkö');
        setEmailAvailable(true);
      }
    };

    checkEmailAvailability();
  }, [inputs.email, getEmailAvailable]);

  return (
    <>
      <h1 className="mt-2">Register</h1>
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex w-[80%] flex-col">
          <label htmlFor="regusername">Username</label>
          <input
            className="my-2.5 rounded-md border border-solid border-stone-300 p-[10px]"
            name="username"
            type="text"
            id="regusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
          {!usernameAvailable && (
            <p className="text-right text-red-500">Username not available</p>
          )}
        </div>
        <div className="flex w-[80%] flex-col">
          <label htmlFor="regpassword">Password</label>
          <input
            className="my-2.5 rounded-md border border-solid border-stone-300 p-[10px]"
            name="password"
            type="password"
            id="regpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <div className="flex w-[80%] flex-col">
          <label htmlFor="regemail">Email</label>
          <input
            className="my-2.5 rounded-md border border-solid border-stone-300 p-[10px]"
            name="email"
            type="email"
            id="regemail"
            onChange={handleInputChange}
            autoComplete="email"
          />
          {!emailAvailable && (
            <p className="text-right text-red-500">Email not available</p>
          )}
        </div>
        <button
          className="m-[15px] w-4/5 cursor-pointer rounded-sm border border-solid border-white bg-white p-[10px] text-black"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
