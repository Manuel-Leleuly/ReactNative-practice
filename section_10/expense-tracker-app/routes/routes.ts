import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  NavigationProp,
  NavigationState,
  useNavigation,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

type RootParamList = {
  ManageExpense: {
    expenseId?: string;
  };
  ExpensesOverview: undefined;
  AllExpenses: undefined;
  RecentExpenses: undefined;
};

export const RootStack = createNativeStackNavigator<RootParamList>();

export const RootBottomTab = createBottomTabNavigator<RootParamList>();

type RootNavigation = Omit<NavigationProp<RootParamList>, "getState"> & {
  getState(): NavigationState | undefined;
};

export const useRootNavigation = () => {
  return useNavigation<RootNavigation>();
};

export type RootStackProps<T extends keyof RootParamList> =
  NativeStackScreenProps<RootParamList, T>;

export type RootBottomTabProps<T extends keyof RootParamList> =
  BottomTabScreenProps<RootParamList, T>;
