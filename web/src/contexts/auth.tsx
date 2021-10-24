import { createContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface IUser {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

interface IAuthContextData {
  user: IUser | null;
  signInUrl: string;
  signOut: () => void;
}

interface ISignInResponse {
  token: string;
  user: IUser;
}

export const AuthContext = createContext({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=969755d2eb7bc914e13d`;

  const signIn = async (githubCode: string) => {
    const response = await api.post<ISignInResponse>('authenticate', {
      code: githubCode,
    });

    const { token, user } = response.data;

    localStorage.setItem('@nlwHeat:token', token);

    setUser(user);
  }

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('@nlwHeat:token');
  }

  useEffect(() => {
    const token = localStorage.getItem('@nlwHeat:token');

    if (token) {
      (async () => {
        const response = await api.get<IUser>('user/profile');

        setUser(response.data);
      })()
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;

    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, urlWithCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);

      console.log('CODE', urlWithCode);

      signIn(urlWithCode);
    }
  }, []);


  return (
    <AuthContext.Provider value={{
      signInUrl,
      user,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;