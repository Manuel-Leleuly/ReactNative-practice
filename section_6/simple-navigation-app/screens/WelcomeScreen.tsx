import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootBottomTabProps } from "../routes/routes";

interface Props extends RootBottomTabProps<"Welcome"> {}

export const WelcomeScreen = ({ navigation }: Props) => {
  useEffect(() => {
    navigation.setOptions({
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" color={color} size={size} />
      ),
    });
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text>
        This is the <Text style={styles.highlight}>"Welcome"</Text> screen!
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
