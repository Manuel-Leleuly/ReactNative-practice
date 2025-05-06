import { useLayoutEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ExpenseForm } from "../components/ManageExpense/ExpenseForm";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";
import { IconButton } from "../components/UI/IconButton";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { RootStackProps } from "../routes/routes";
import {
  ExpenseRequestBody,
  useExpensesContext,
} from "../store/expenses-context";
import { HttpUtils } from "../utils/http";

interface Props extends RootStackProps<"ManageExpense"> {}

export const ManageExpense = ({ navigation, route }: Props) => {
  const { addExpense, deleteExpense, updateExpense, expenses } =
    useExpensesContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      editedExpenseId && (await HttpUtils.deleteExpense(editedExpenseId));
      editedExpenseId && deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError(new Error("Could not delete expense - please try again later!"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const submitHandler = async (expenseData: ExpenseRequestBody) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        updateExpense(editedExpenseId, expenseData);
        await HttpUtils.updateExpense(editedExpenseId, expenseData);
      } else {
        const { expenseId } = await HttpUtils.storeExpense(expenseData);
        addExpense({ ...expenseData, id: expenseId });
      }
      navigation.goBack();
    } catch (error) {
      setError(new Error("Could not save data - please try again later!"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error && !isSubmitting) {
    return (
      <ErrorOverlay
        errorMessage={error.message}
        onConfirm={() => setError(null)}
      />
    );
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

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
