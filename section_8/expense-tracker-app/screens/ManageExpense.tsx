import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "../components/UI/Button";
import { IconButton } from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { RootStackProps } from "../routes/routes";
import { useExpensesContext } from "../store/expenses-context";

interface Props extends RootStackProps<"ManageExpense"> {}

export const ManageExpense = ({ navigation, route }: Props) => {
  const { addExpense, deleteExpense, updateExpense } = useExpensesContext();
  const editedExpenseId = route.params.expenseId;
  const isEditing = !!editedExpenseId;

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

  const confirmHandler = () => {
    if (isEditing) {
      updateExpense(editedExpenseId, {
        description: "Test !!!!",
        amount: 29.99,
        date: new Date("2024-05-20"),
      });
    } else {
      addExpense({
        description: "Test",
        amount: 19.99,
        date: new Date("2024-05-19"),
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          label="Cancel"
          isFlat
          onPress={cancelHandler}
        />
        <Button
          style={styles.button}
          label={isEditing ? "Update" : "Add"}
          onPress={confirmHandler}
        />
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
