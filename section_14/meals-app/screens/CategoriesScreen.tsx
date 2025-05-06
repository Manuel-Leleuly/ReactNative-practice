import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { CategoryGridTile } from "../components/CategoryGridTile";
import { CATEGORIES } from "../data/dummy-data";
import { Category } from "../models/category";
import { RootDrawerProps } from "../routes/routes";

interface Props extends RootDrawerProps<"MealsCategoriesDrawer"> {}

export const CategoriesScreen = ({ navigation }: Props) => {
  useEffect(() => {
    navigation.setOptions({
      title: "All Categories",
      drawerIcon: ({ color, size }) => (
        <Ionicons name="list" color={color} size={size} />
      ),
    });
  }, []);

  const pressHandler = (item: Category) => {
    navigation.navigate("MealsOverview", {
      categoryId: item.id,
    });
  };

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <CategoryGridTile
          title={itemData.item.title}
          color={itemData.item.color}
          onPress={() => pressHandler(itemData.item)}
        />
      )}
      numColumns={2}
      style={{
        margin: "auto",
      }}
    />
  );
};
