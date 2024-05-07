import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  // const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const onLogin = (data) => {
    setUser(data);
  };

  // call this function to sign out logged in user
  const onLogout = () => {
    setUser(null);
    redirect('/login', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      onLogin,
      onLogout,
    }),
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
