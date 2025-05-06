import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { IconButton } from "./components/UI/IconButton";
import { Colors } from "./constants/styles";
import { RootStack } from "./routes/routes";
import { LoginScreen } from "./screens/LoginScreen";
import { SignupScreen } from "./screens/SignupScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { AuthProvider, useAuthContext } from "./store/auth-context";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </>
  );
}

const Navigation = () => {
  const { isAuthenticated, fetchToken, isFetching } = useAuthContext();

  useEffect(() => {
    fetchToken();
  }, []);

  if (isFetching) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
};

const AuthStack = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Signup" component={SignupScreen} />
    </RootStack.Navigator>
  );
};

const AuthenticatedStack = () => {
  const { logout } = useAuthContext();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <RootStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={logout}
            />
          ),
        }}
      />
    </RootStack.Navigator>
  );
};
