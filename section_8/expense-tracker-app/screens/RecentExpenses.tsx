import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { useExpensesContext } from "../store/expenses-context";
import { dateUtils } from "../utils/date";

export const RecentExpenses = () => {
  const { expenses } = useExpensesContext();

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = dateUtils.getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7 days."
    />
  );
};
