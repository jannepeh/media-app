import {useUser} from '../hooks/apiHooks';
import {useForm} from '../hooks/FormHooks';
import {RegisterCredentials} from '../types/LocalTypes';

const RegisterForm = () => {
  const {postRegister} = useUser();
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

  return (
    <>
      <h1>Register</h1>
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex w-[80%] flex-col">
          <label htmlFor="regusername">Username</label>
          <input
            className="m-[10px 0] rounded-sm border border-solid border-stone-300 p-[10px]"
            name="username"
            type="text"
            id="regusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div className="flex w-[80%] flex-col">
          <label htmlFor="regpassword">Password</label>
          <input
            className="m-[10px 0] rounded-sm border border-solid border-stone-300 p-[10px]"
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
            className="m-[10px 0] rounded-sm border border-solid border-stone-300 p-[10px]"
            name="email"
            type="email"
            id="regemail"
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>
        <button
          className="m-[15px] cursor-pointer rounded-sm border border-solid border-white bg-white p-[10px] text-black"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
