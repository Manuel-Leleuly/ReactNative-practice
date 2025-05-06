import {
  createDrawerNavigator,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

// Native Stack
type RootParamList = {
  MealsCategories: undefined;
  MealsCategoriesDrawer: undefined;
  MealsOverview: {
    categoryId: string;
  };
  MealDetail: {
    mealId: string;
  };
  Favorites: undefined;
};

export type RootScreenProps<T extends keyof RootParamList> =
  NativeStackScreenProps<RootParamList, T>;

export const RootStack = createNativeStackNavigator<RootParamList>();

// Drawer
export type RootDrawerProps<T extends keyof RootParamList> = DrawerScreenProps<
  RootParamList,
  T
>;
export const RootDrawer = createDrawerNavigator<RootParamList>();
