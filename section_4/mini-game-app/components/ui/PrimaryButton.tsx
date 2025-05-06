import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

interface Props {
  children: ReactNode;
  onPress: () => void;
}

export const PrimaryButton = ({ children, onPress }: Props) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={(event) => {
          event.preventDefault();
          onPress();
        }}
        android_ripple={{
          color: Colors.primary600,
        }}
        style={({ pressed }) => {
          if (pressed) return [styles.buttonInnerContainer, styles.pressed];
          return styles.buttonInnerContainer;
        }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
