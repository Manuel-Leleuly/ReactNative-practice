import { useState } from "react";
import { Alert } from "react-native";
import { AuthContent } from "../components/Auth/AuthContent";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { useAuthContext } from "../store/auth-context";
import { AuthUtils } from "../util/auth";

export const SignupScreen = () => {
  const { authenticate } = useAuthContext();

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signupHandler = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsAuthenticating(true);
    try {
      const token = await AuthUtils.createUser(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again later!"
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
};
