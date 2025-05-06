import axios from "axios";
import { Expense } from "../data/dummy-expenses";
import { ExpenseRequestBody } from "../store/expenses-context";

// TODO: use your firebase url
const baseUrl = "";

type FirebaseResponse<T extends { id: string }> = Record<
  T["id"],
  Omit<T, "id">
>;
type FirebaseObjectWithDate<T extends { date: Date }> = Omit<T, "date"> & {
  date: string;
};

export class HttpUtils {
  static storeExpense = async (
    expenseData: ExpenseRequestBody
  ): Promise<{ expenseId: string }> => {
    const response = await axios.post(`${baseUrl}/expenses.json`, expenseData);
    const id = response.data.name;
    return { expenseId: id };
  };

  static fetchExpenses = async (): Promise<Expense[]> => {
    const response = await axios.get<
      FirebaseResponse<FirebaseObjectWithDate<Expense>>
    >(`${baseUrl}/expenses.json`);

    return Object.keys(response.data).map((key) => ({
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    }));
  };

  static updateExpense = (id: string, expenseData: ExpenseRequestBody) => {
    return axios.put(`${baseUrl}/expenses/${id}.json`, expenseData);
  };

  static deleteExpense = (id: string) => {
    return axios.delete(`${baseUrl}/expenses/${id}.json`);
  };
}
