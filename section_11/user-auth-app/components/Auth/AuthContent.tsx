import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/styles";
import { useRootNavigation } from "../../routes/routes";
import {
  Credentials,
  CredentialsValidation,
} from "../../validation/credentials-validation";
import { FlatButton } from "../UI/FlatButton";
import { AuthForm } from "./AuthForm";

interface Props {
  isLogin?: boolean;
  onAuthenticate?: (loginData: Pick<Credentials, "email" | "password">) => void;
}

export const AuthContent = ({ isLogin, onAuthenticate }: Props) => {
  const navigation = useRootNavigation();

  const [credentialsInvalid, setCredentialsInvalid] =
    useState<CredentialsValidation>({
      email: false,
      password: false,
      confirmEmail: false,
      confirmPassword: false,
    });

  const switchAuthModeHandler = () => {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  };

  const submitHandler = (credentials: Credentials) => {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate?.({ email, password });
  };

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={!!isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton
          onPress={switchAuthModeHandler}
          label={isLogin ? "Create a new user" : "Log in instead"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
