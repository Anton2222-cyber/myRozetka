import axios from "axios";
import { createContext } from "react";

export type TokenContextType = {
  token: string,
  setToken: (newToken: string) => void
}

const tempValue: TokenContextType = {
  token: '',
  setToken() { }
}

export const TokenContext = createContext<TokenContextType>(tempValue);

export const createContextValueByState = (tokenState: [string, React.Dispatch<React.SetStateAction<string>>]): TokenContextType => {
  const [token, setToken] = tokenState;

  return {
    token,
    setToken(newToken: string) {
      setToken(newToken);
      if (newToken) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
        localStorage.setItem('token', newToken);
      }
      else {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem('token');
      }
    }
  };
}