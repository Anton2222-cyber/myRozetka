import { createContext } from "react";
import http_common from "../http_common.ts";

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
        http_common.defaults.headers.common["Authorization"] = "Bearer " + newToken;
        localStorage.setItem('token', newToken);
      }
      else {
        delete http_common.defaults.headers.common["Authorization"];
        localStorage.removeItem('token');
      }
    }
  };
}