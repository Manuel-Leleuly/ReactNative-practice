import { useLayoutEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { IconButton } from "../components/common-components/IconButton";
import { List } from "../components/MealDetail/List";
import { Subtitle } from "../components/MealDetail/Subtitle";
import { MealDetails } from "../components/MealDetails";
import { MEALS } from "../data/dummy-data";
import { RootScreenProps } from "../routes/routes";

interface Props extends RootScreenProps<"MealDetail"> {}

export const MealDetailScreen = ({ route, navigation }: Props) => {
  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId)!;

  const headerButtonPressHandler = () => {
    console.log("pressed");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "About The Meal",
      headerRight: () => {
        return (
          <IconButton
            icon="star"
            onPress={headerButtonPressHandler}
            color="white"
          />
        );
      },
    });
  }, [navigation, headerButtonPressHandler]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails meal={selectedMeal} textStyle={styles.detailText} />
      <View style={styles.listContainer}>
        <Subtitle title="Ingredients" />
        <List dataList={selectedMeal.ingredients} />
        <Subtitle title="Steps" />
        <List dataList={selectedMeal.steps} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  listContainer: {
    width: "80%",
    margin: "auto",
    marginBottom: 32,
  },
});
