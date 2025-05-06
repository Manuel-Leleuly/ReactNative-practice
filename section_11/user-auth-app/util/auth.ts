import axios from "axios";

const baseUrl = "";
const apiKey = "";

export class AuthUtils {
  static authenticate = async (
    mode: "signUp" | "signInWithPassword",
    email: string,
    password: string
  ) => {
    const response = await axios.post(
      `${baseUrl}:${mode}`,
      {
        email,
        password,
        returnSecureToken: true,
      },
      {
        params: {
          key: apiKey,
        },
      }
    );

    return response.data.idToken as string;
  };

  static createUser = async (email: string, password: string) => {
    return await this.authenticate("signUp", email, password);
  };

  static login = async (email: string, password: string) => {
    return await this.authenticate("signInWithPassword", email, password);
  };
}
