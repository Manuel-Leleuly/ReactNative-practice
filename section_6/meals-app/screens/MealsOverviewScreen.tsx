import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { MealItem } from "../components/MealItem";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { Meal } from "../models/meal";
import { RootScreenProps } from "../routes/routes";

interface Props extends RootScreenProps<"MealsOverview"> {}

export const MealsOverviewScreen = ({ route, navigation }: Props) => {
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(catId)
  );

  useEffect(() => {
    const selectedCategory = CATEGORIES.find(
      (category) => category.id === catId
    );
    navigation.setOptions({
      title: selectedCategory?.title ?? "Meals Overview",
    });
  }, []);

  const onMealPress = (meal: Meal) => {
    navigation.navigate("MealDetail", {
      mealId: meal.id,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(meal) => meal.id}
        renderItem={(itemData) => (
          <MealItem
            meal={itemData.item}
            onPress={() => onMealPress(itemData.item)}
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
