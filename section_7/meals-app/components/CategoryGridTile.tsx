import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "./common-components/Card";

interface Props {
  title: string;
  color: string;
  onPress: () => void;
}

export const CategoryGridTile = ({ title, color, onPress }: Props) => {
  return (
    <Card style={[styles.gridItem, { backgroundColor: color }]}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </Card>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    height: 150,
    width: 150,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
