import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [displayRegister, setDisplayRegister] = useState<boolean>(false);

  const toggleRegister = () => {
    setDisplayRegister(!displayRegister);
  };
  return (
    <>
      {displayRegister ? (
        <RegisterForm />
      ) : (
        <LoginForm toggleRegister={toggleRegister} />
      )}
      <button
        className="m-[5px] cursor-pointer rounded-sm border border-solid border-white bg-white p-[10px] text-black"
        onClick={toggleRegister}
      >
        {displayRegister ? 'Login?' : 'Register?'}
      </button>
    </>
  );
};

export default Login;
