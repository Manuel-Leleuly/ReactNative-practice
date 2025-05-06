import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { Colors } from "../../constants/colors";

interface Props {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

export const InstructionText = ({ children, style }: Props) => {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});
