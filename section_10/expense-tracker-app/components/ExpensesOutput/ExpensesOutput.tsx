import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Expense } from "../../data/dummy-expenses";
import { ExpensesList } from "./ExpensesList";
import { ExpensesSummary } from "./ExpensesSummary";

interface Props {
  expensesPeriod: string;
  expenses: Expense[];
  fallbackText: string;
}

export const ExpensesOutput = ({
  expensesPeriod,
  expenses,
  fallbackText,
}: Props) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {!expenses.length && <Text style={styles.infoText}>{fallbackText}</Text>}
      {!!expenses.length && <ExpensesList expenses={expenses} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
