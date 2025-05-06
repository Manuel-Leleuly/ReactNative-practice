import { useEffect } from "react";
import { MealList } from "../components/MealList/MealList";
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

  return <MealList meals={displayedMeals} onMealItemPress={onMealPress} />;
};
