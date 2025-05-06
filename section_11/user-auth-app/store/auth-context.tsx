import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextType = {
  token: string;
  fetchToken: () => Promise<void>;
  isFetching: boolean;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const fetchToken = async () => {
    setIsFetching(true);
    const storedToken = await AsyncStorage.getItem("token");
    storedToken && setAuthToken(storedToken);
    setIsFetching(false);
  };

  const authenticate = (token: string) => {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  };

  const logout = () => {
    setAuthToken("");
    AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        token: authToken,
        fetchToken,
        isFetching,
        isAuthenticated: !!authToken.length,
        authenticate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
