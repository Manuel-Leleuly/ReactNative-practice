import { useLayoutEffect, useMemo } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "../components/common-components/IconButton";
import { List } from "../components/MealDetail/List";
import { Subtitle } from "../components/MealDetail/Subtitle";
import { MealDetails } from "../components/MealDetails";
import { MEALS } from "../data/dummy-data";
import { RootScreenProps } from "../routes/routes";
import { addFavorite, removeFavorite } from "../store/redux/favorites";
import { RootState } from "../store/redux/store";

interface Props extends RootScreenProps<"MealDetail"> {}

export const MealDetailScreen = ({ route, navigation }: Props) => {
  const favoriteMealIds = useSelector<RootState>(
    (state) => state.favoriteMeals.ids
  ) as string[];
  const dispatch = useDispatch();
  // const {
  //   ids: favoriteMealIds,
  //   addFavorite,
  //   removeFavorite,
  // } = useFavoritesContext();

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId)!;

  const mealIsFavorite = useMemo(
    () => favoriteMealIds.includes(mealId),
    [favoriteMealIds]
  );

  const changeFavoriteStatusHandler = () => {
    // const favoriteFn = mealIsFavorite ? removeFavorite : addFavorite;
    // favoriteFn(mealId);
    if (mealIsFavorite) {
      dispatch(removeFavorite({ id: mealId }));
    } else {
      dispatch(addFavorite({ id: mealId }));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "About The Meal",
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            onPress={changeFavoriteStatusHandler}
            color="white"
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails meal={selectedMeal} textStyle={styles.detailText} />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle title="Ingredients" />
          <List dataList={selectedMeal.ingredients} />
          <Subtitle title="Steps" />
          <List dataList={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
