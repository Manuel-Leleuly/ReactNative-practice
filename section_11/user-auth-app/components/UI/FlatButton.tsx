import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";

interface Props {
  label: string;
  onPress: () => void;
}

export const FlatButton = ({ label, onPress }: Props) => {
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
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.primary100,
  },
});
