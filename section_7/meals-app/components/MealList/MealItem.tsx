import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Meal } from "../../models/meal";
import { Card } from "../common-components/Card";
import { MealDetails } from "../MealDetails";

interface Props {
  meal: Meal;
  onPress: () => void;
}

export const MealItem = ({ meal, onPress }: Props) => {
  return (
    <Card style={styles.mealItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => pressed && styles.buttonPressed}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image source={{ uri: meal.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{meal.title}</Text>
          </View>
          <MealDetails meal={meal} />
        </View>
      </Pressable>
    </Card>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    shadowOpacity: 0.35,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
});
