import {useUserContext} from '../hooks/ContextHooks';
import {useForm} from '../hooks/FormHooks';
import {Credentials} from '../types/LocalTypes';

type Props = {
  toggleRegister: () => void;
};

const LoginForm = (props: Props) => {
  const toggleRegister = props.toggleRegister;
  const {handleLogin} = useUserContext();
  const initValues: Credentials = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      handleLogin(inputs as Credentials);
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doLogin,
    initValues,
  );

  return (
    <>
      <h1>Login</h1>
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex w-[80%] flex-col">
          <label htmlFor="loginusername">Username</label>
          <input
            className="m-[10px 0] rounded-sm border border-solid border-stone-300 p-[10px]"
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
            // value={inputs.username}
          />
        </div>
        <div className="flex w-[80%] flex-col">
          <label htmlFor="loginpassword">Password</label>
          <input
            className="m-[10px 0] rounded-sm border border-solid border-stone-300 p-[10px]"
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            // value={inputs.password}
          />
        </div>
        <button
          className="m-[10px] cursor-pointer rounded-sm border border-solid border-white bg-white p-[10px] text-black"
          type="submit"
        >
          Login
        </button>
        <button
          className="cursor-pointer rounded-sm border border-solid border-white bg-white p-[10px] text-black"
          onClick={toggleRegister}
        >
          Register
        </button>
      </form>
    </>
  );
};

export default LoginForm;
