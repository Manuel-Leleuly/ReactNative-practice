import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { IconButton } from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import { RootStack } from "./routes/routes";
import { AddPlace } from "./screens/AddPlace";
import { AllPlaces } from "./screens/AllPlaces";
import { Map } from "./screens/Map";
import { PlaceDetails } from "./screens/PlaceDetails";
import { databaseUtils } from "./utils/database";

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    databaseUtils
      .init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((error) => console.error(error));
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <RootStack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <RootStack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a new Place",
            }}
          />
          <RootStack.Screen name="Map" component={Map} />
          <RootStack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: "Place Details",
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
}
