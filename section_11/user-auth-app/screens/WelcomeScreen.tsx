import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthContext } from "../store/auth-context";

export const WelcomeScreen = () => {
  const { token } = useAuthContext();

  const [fetchedMessage, setFetchedMessage] = useState("");

  useEffect(() => {
    axios
      .get("", {
        params: {
          auth: token,
        },
      })
      .then((response) => setFetchedMessage(response.data));
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
