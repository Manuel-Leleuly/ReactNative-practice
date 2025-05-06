import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { IconButton } from "./components/UI/IconButton";
import { GlobalStyles } from "./constants/styles";
import { RootBottomTab, RootStack } from "./routes/routes";
import { AllExpenses } from "./screens/AllExpenses";
import { ManageExpense } from "./screens/ManageExpense";
import { RecentExpenses } from "./screens/RecentExpenses";
import { ExpensesProvider } from "./store/expenses-context";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesProvider>
        <NavigationContainer>
          <RootStack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <RootStack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen name="ManageExpense" component={ManageExpense} />
          </RootStack.Navigator>
        </NavigationContainer>
      </ExpensesProvider>
    </>
  );
}

const ExpensesOverview = () => {
  return (
    <RootBottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense", {});
            }}
          />
        ),
      })}
    >
      <RootBottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
        }}
      />
      <RootBottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
    </RootBottomTab.Navigator>
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
