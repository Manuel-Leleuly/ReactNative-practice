import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Meal } from "../models/meal";

interface Props {
  meal: Meal;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const MealDetails = ({ meal, style, textStyle }: Props) => {
  return (
    <View style={[styles.details, style]}>
      <Text style={[styles.detailItem, textStyle]}>{meal.duration}m</Text>
      <Text style={[styles.detailItem, textStyle]}>
        {meal.complexity.toUpperCase()}
      </Text>
      <Text style={[styles.detailItem, textStyle]}>
        {meal.affordability.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
