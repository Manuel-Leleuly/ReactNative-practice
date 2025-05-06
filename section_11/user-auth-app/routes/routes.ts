import { useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

type RootParamList = {
  Login: undefined;
  Signup: undefined;
  Welcome: undefined;
};

export type RootStackProps<T extends keyof RootParamList> =
  NativeStackScreenProps<RootParamList, T>;

export const RootStack = createNativeStackNavigator<RootParamList>();

export const useRootNavigation = () => {
  // return useNavigation<
  //   Omit<NavigationProp<RootParamList>, "getState"> & {
  //     getState(): NavigationState | undefined;
  //   }
  // >();
  return useNavigation<NativeStackNavigationProp<RootParamList>>();
};
