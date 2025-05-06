import { ReactNode } from "react";
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface Props {
  style: StyleProp<ViewStyle>;
  children: ReactNode;
}

export const Card = ({ style, children }: Props) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
});
