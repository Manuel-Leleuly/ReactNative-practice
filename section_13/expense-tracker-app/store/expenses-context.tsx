import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import { DUMMY_EXPENSES, Expense } from "../data/dummy-expenses";
import { HttpUtils } from "../utils/http";

export type ExpenseRequestBody = Pick<
  Expense,
  "description" | "amount" | "date"
>;

interface ExpensesContextType {
  expenses: Expense[];
  fetchExpenses: () => Promise<void>;
  addExpense: (expenseReqBody: ExpenseRequestBody & { id: string }) => void;
  deleteExpense: (expenseId: string) => void;
  updateExpense: (
    expenseId: string,
    expenseReqBody: ExpenseRequestBody
  ) => void;

  isFetching: boolean;
  fetchError: Error | null;
  clearError: () => void;
}

const ExpensesContext = createContext<ExpensesContextType>(
  {} as ExpensesContextType
);

enum ExpenseActionType {
  ADD = "ADD",
  SET = "SET",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

type ExpenseAction = {
  type: keyof typeof ExpenseActionType;
  payload: any;
};

const expensesReducer = (state: Expense[], action: ExpenseAction) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    case "SET":
      return action.payload.reverse();
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = Array.from(state);
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

export const ExpensesProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  const fetchExpenses = async () => {
    setIsFetching(true);
    try {
      const fetchedExpenses = await HttpUtils.fetchExpenses();
      dispatch({ type: "SET", payload: fetchedExpenses });
    } catch (error) {
      setFetchError(new Error("Could not fetch expenses!"));
    } finally {
      setIsFetching(false);
    }
  };

  const addExpense = (expenseReqBody: ExpenseRequestBody & { id: string }) => {
    dispatch({ type: "ADD", payload: expenseReqBody });
  };

  const deleteExpense = (expenseId: string) => {
    dispatch({ type: "DELETE", payload: expenseId });
  };

  const updateExpense = (
    expenseId: string,
    expenseReqBody: ExpenseRequestBody
  ) => {
    dispatch({
      type: "UPDATE",
      payload: { id: expenseId, data: expenseReqBody },
    });
  };

  const clearError = () => {
    setFetchError(null);
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        fetchExpenses,
        addExpense,
        deleteExpense,
        updateExpense,
        isFetching,
        fetchError,
        clearError,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpensesContext = () => useContext(ExpensesContext);
