import { createContext, ReactNode, useContext, useReducer } from "react";
import { DUMMY_EXPENSES, Expense } from "../data/dummy-expenses";

export type ExpenseRequestBody = Pick<
  Expense,
  "description" | "amount" | "date"
>;

interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (expenseReqBody: ExpenseRequestBody) => void;
  deleteExpense: (expenseId: string) => void;
  updateExpense: (
    expenseId: string,
    expenseReqBody: ExpenseRequestBody
  ) => void;
}

const ExpensesContext = createContext<ExpensesContextType>(
  {} as ExpensesContextType
);

enum ExpenseActionType {
  ADD = "ADD",
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

  const addExpense = (expenseReqBody: ExpenseRequestBody) => {
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

  return (
    <ExpensesContext.Provider
      value={{ expenses, addExpense, deleteExpense, updateExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpensesContext = () => useContext(ExpensesContext);
