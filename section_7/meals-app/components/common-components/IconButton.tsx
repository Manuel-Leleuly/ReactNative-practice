import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

interface Props {
  icon: keyof (typeof Ionicons)["glyphMap"];
  color: string;
  onPress: () => void;
}

export const IconButton = ({ icon, onPress, color }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Ionicons name={icon} size={24} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
