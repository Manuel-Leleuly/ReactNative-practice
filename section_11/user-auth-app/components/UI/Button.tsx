import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";

interface Props {
  label: string;
  onPress: () => void;
}

export const Button = ({ label, onPress }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
