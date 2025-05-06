import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { RootDrawer, RootStack } from "./routes/routes";
import { CategoriesScreen } from "./screens/CategoriesScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { MealDetailScreen } from "./screens/MealDetailScreen";
import { MealsOverviewScreen } from "./screens/MealsOverviewScreen";
import { store } from "./store/redux/store";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        {/* <FavoritesProvider> */}
        <NavigationContainer>
          <RootStack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#351401" },
              headerTintColor: "white",
              contentStyle: { backgroundColor: "#3f2f25" },
            }}
          >
            <RootStack.Screen
              name="MealsCategories"
              component={RootDrawerNavigator}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
            />
            <RootStack.Screen name="MealDetail" component={MealDetailScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
        {/* </FavoritesProvider> */}
      </Provider>
    </>
  );
}

const RootDrawerNavigator = () => {
  return (
    <RootDrawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        sceneStyle: { backgroundColor: "#3f2f25" },
        drawerContentStyle: {
          backgroundColor: "#351401",
        },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "#e4baa1",
      }}
    >
      <RootDrawer.Screen
        name="MealsCategoriesDrawer"
        component={CategoriesScreen}
      />
      <RootDrawer.Screen name="Favorites" component={FavoritesScreen} />
    </RootDrawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
