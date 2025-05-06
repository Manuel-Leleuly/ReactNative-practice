import { useState } from "react";
import { Alert } from "react-native";
import { AuthContent } from "../components/Auth/AuthContent";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { useAuthContext } from "../store/auth-context";
import { AuthUtils } from "../util/auth";

export const LoginScreen = () => {
  const { authenticate } = useAuthContext();

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const loginHandler = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsAuthenticating(true);
    try {
      const token = await AuthUtils.login(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later"
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};
