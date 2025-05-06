import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { MealList } from "../components/MealList/MealList";
import { MEALS } from "../data/dummy-data";
import { Meal } from "../models/meal";
import { RootDrawerProps } from "../routes/routes";
import { RootState } from "../store/redux/store";

interface Props extends RootDrawerProps<"Favorites"> {}

export const FavoritesScreen = ({ navigation }: Props) => {
  // const { ids: favoriteMealIds } = useFavoritesContext();
  const favoriteMealIds = useSelector<RootState>(
    (state) => state.favoriteMeals.ids
  ) as string[];

  useEffect(() => {
    navigation.setOptions({
      title: "Favorites",
      drawerIcon: ({ color, size }) => (
        <Ionicons name="star" color={color} size={size} />
      ),
    });
  }, []);

  const onMealItemPress = (meal: Meal) => {
    navigation.navigate("MealDetail", {
      mealId: meal.id,
    });
  };

  const favoriteMeals = MEALS.filter((meal) =>
    favoriteMealIds.includes(meal.id)
  );

  if (!favoriteMeals.length) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet.</Text>
      </View>
    );
  }

  return <MealList meals={favoriteMeals} onMealItemPress={onMealItemPress} />;
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
  },
});
