export type Credentials = {
  email: string;
  password: string;
  confirmEmail: string;
  confirmPassword: string;
};

export type CredentialsValidation = Record<keyof Credentials, boolean>;
