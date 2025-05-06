import { useEffect } from "react";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { useExpensesContext } from "../store/expenses-context";
import { DateUtils } from "../utils/date";

export const RecentExpenses = () => {
  const { expenses, fetchExpenses, isFetching, fetchError, clearError } =
    useExpensesContext();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = DateUtils.getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  if (fetchError && !isFetching) {
    return (
      <ErrorOverlay errorMessage={fetchError.message} onConfirm={clearError} />
    );
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7 days."
    />
  );
};
