import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { LatLng } from "react-native-maps";
import { Place } from "../models/place";

type NavigationProp<T extends Record<string, any> | undefined = undefined> =
  T extends undefined ? undefined : T | undefined;

type RootParamList = {
  AllPlaces: NavigationProp<{ place: Place }>;
  AddPlace: NavigationProp<LatLng>;
  Map: NavigationProp<LatLng>;
  PlaceDetails: NavigationProp<{ placeId: string }>;
};

export const RootStack = createNativeStackNavigator<RootParamList>();

export const useRootNavigation = () => {
  return useNavigation<NativeStackNavigationProp<RootParamList>>();
};

export const useRootRoute = <T extends keyof RootParamList>() => {
  return useRoute<RouteProp<RootParamList, T>>();
};
