import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Expense } from "../../data/dummy-expenses";
import { useRootNavigation } from "../../routes/routes";
import { DateUtils } from "../../utils/date";

interface Props {
  expense: Expense;
}

export const ExpenseItem = ({ expense }: Props) => {
  const navigation = useRootNavigation();

  const expensePressHandler = () => {
    navigation.navigate("ManageExpense", {
      expenseId: expense.id,
    });
  };

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {expense.description}
          </Text>
          <Text style={styles.textBase}>
            {DateUtils.getFormattedDate(expense.date)}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{expense.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.73,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
