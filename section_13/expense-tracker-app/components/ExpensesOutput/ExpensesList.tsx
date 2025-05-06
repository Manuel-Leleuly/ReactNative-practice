import { FlatList } from "react-native";
import { Expense } from "../../data/dummy-expenses";
import { ExpenseItem } from "./ExpenseItem";

interface Props {
  expenses: Expense[];
}

export const ExpensesList = ({ expenses }: Props) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(expense) => expense.id}
      renderItem={({ item: expense }) => {
        return <ExpenseItem expense={expense} />;
      }}
    />
  );
};
