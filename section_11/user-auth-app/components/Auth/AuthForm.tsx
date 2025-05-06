import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Credentials,
  CredentialsValidation,
} from "../../validation/credentials-validation";
import { Button } from "../UI/Button";
import { Input } from "./Input";

interface Props {
  isLogin: boolean;
  onSubmit: (registerData: Credentials) => void;
  credentialsInvalid: CredentialsValidation;
}

enum InputType {
  email = "email",
  confirmEmail = "confirmEmail",
  password = "password",
  confirmPassword = "confirmPassword",
}

export const AuthForm = ({ isLogin, onSubmit, credentialsInvalid }: Props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  const updateInputValueHandler = (
    inputType: keyof typeof InputType,
    enteredValue: string
  ) => {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  };

  const submitHandler = () => {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  };

  return (
    <View>
      <View>
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, "confirmEmail")}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
          />
        )}
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button
            onPress={submitHandler}
            label={isLogin ? "Log In" : "Sign Up"}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
