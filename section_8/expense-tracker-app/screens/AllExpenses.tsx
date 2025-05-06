import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { useExpensesContext } from "../store/expenses-context";

export const AllExpenses = () => {
  const { expenses } = useExpensesContext();
  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expenses}
      fallbackText="No registered expenses found"
    />
  );
};
