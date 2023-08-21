import { createContext, Dispatch, SetStateAction } from 'react';

export interface IAuthContext {
  isAuth: string | null;
  setIsAuth: Dispatch<SetStateAction<string | null>>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);
export default AuthContext;
