import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

interface Props {
  children: ReactNode;
}

export const Title = ({ children }: Props) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "white",
    padding: 12,
  },
});
