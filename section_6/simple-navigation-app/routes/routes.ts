import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from "@react-navigation/drawer";

type RootParamList = {
  Welcome: undefined;
  User: undefined;
};

// Drawer
export type RootDrawerProps<T extends keyof RootParamList> = DrawerScreenProps<
  RootParamList,
  T
>;

export const RootDrawer = createDrawerNavigator<RootParamList>();

// Tabs
export type RootBottomTabProps<T extends keyof RootParamList> =
  BottomTabScreenProps<RootParamList, T>;

export const RootBottomTabs = createBottomTabNavigator<RootParamList>();
