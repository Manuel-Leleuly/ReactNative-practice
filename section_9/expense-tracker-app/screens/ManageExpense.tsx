import { useLayoutEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ExpenseForm } from "../components/ManageExpense/ExpenseForm";
import { IconButton } from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { RootStackProps } from "../routes/routes";
import {
  ExpenseRequestBody,
  useExpensesContext,
} from "../store/expenses-context";

interface Props extends RootStackProps<"ManageExpense"> {}

export const ManageExpense = ({ navigation, route }: Props) => {
  const { addExpense, deleteExpense, updateExpense, expenses } =
    useExpensesContext();
  const editedExpenseId = route.params.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = useMemo(
    () => expenses.find((expense) => expense.id === editedExpenseId),
    [expenses]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      presentation: "modal",
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, []);

  const deleteExpenseHandler = () => {
    editedExpenseId && deleteExpense(editedExpenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const submitHandler = (expenseData: ExpenseRequestBody) => {
    if (isEditing) {
      updateExpense(editedExpenseId, expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={submitHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
