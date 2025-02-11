import {Link, Outlet} from 'react-router-dom';
import {useUserContext} from '../hooks/ContextHooks';
import {useEffect} from 'react';

const Layout = () => {
  // jos käyttäjää ei ole, kutsu handleAutoLogin useEffectin sisällä
  const {user, handleAutoLogin} = useUserContext();
  useEffect(() => {
    if (!user) {
      handleAutoLogin();
    }
  }, []);
  return (
    <>
      <h1>My App</h1>
      <div>
        <nav>
          <ul className="m-0 flex list-none justify-end overflow-hidden rounded-2xl bg-stone-600 p-0">
            <li>
              <Link
                className="block p-4 text-center transition-all duration-500 ease-in-out hover:bg-stone-700"
                to="/"
              >
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    className="block p-4 text-center transition-all duration-500 ease-in-out hover:bg-stone-800"
                    to="/Profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="block p-4 text-center transition-all duration-500 ease-in-out hover:bg-stone-800"
                    to="/Upload"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    className="block p-4 text-center transition-all duration-500 ease-in-out hover:bg-stone-800"
                    to="/Logout"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="block p-4 text-center transition-all duration-500 ease-in-out hover:bg-stone-800"
                  to="/Login"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
        <footer>
          <p>&copy; 2025</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
