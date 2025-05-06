import { FlatList, StyleSheet, View } from "react-native";
import { Meal } from "../../models/meal";
import { MealItem } from "./MealItem";

interface Props {
  meals: Meal[];
  onMealItemPress: (meal: Meal) => void;
}

export const MealList = ({ meals, onMealItemPress }: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={(meal) => meal.id}
        renderItem={(itemData) => (
          <MealItem
            meal={itemData.item}
            onPress={() => onMealItemPress(itemData.item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
