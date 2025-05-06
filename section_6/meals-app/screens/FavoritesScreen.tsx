import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { RootDrawerProps } from "../routes/routes";

interface Props extends RootDrawerProps<"Favorites"> {}

export const FavoritesScreen = ({ navigation }: Props) => {
  useEffect(() => {
    navigation.setOptions({
      title: "Favorites",
      drawerIcon: ({ color, size }) => (
        <Ionicons name="star" color={color} size={size} />
      ),
    });
  }, []);

  return (
    <View>
      <Text>This is the favorites screen</Text>
    </View>
  );
};
