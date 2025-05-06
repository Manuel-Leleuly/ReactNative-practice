import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootBottomTabProps } from "../routes/routes";

interface Props extends RootBottomTabProps<"User"> {}

export const UserScreen = ({ navigation }: Props) => {
  useEffect(() => {
    navigation.setOptions({
      title: "User",
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="person" color={color} size={size} />
      ),
    });
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text>
        This is the <Text style={styles.highlight}>"User"</Text> screen!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  highlight: {
    fontWeight: "bold",
    color: "#eb1064",
  },
});
