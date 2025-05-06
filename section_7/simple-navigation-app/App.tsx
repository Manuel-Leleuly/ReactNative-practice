import { NavigationContainer } from "@react-navigation/native";
import { RootBottomTabs } from "./routes/routes";
import { UserScreen } from "./screens/UserScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";

export default function App() {
  return (
    <NavigationContainer>
      <RootBottomTabs.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#3c0a6b",
          },
          headerTintColor: "white",
          tabBarActiveTintColor: "#3c0a6b",
        }}
      >
        <RootBottomTabs.Screen name="Welcome" component={WelcomeScreen} />
        <RootBottomTabs.Screen name="User" component={UserScreen} />
      </RootBottomTabs.Navigator>
    </NavigationContainer>
  );
}
