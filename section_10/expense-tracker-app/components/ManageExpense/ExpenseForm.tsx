import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Expense } from "../../data/dummy-expenses";
import { ExpenseRequestBody } from "../../store/expenses-context";
import { DateUtils } from "../../utils/date";
import { Button } from "../UI/Button";
import { Input } from "./Input";

enum InputIdentifier {
  amount = "amount",
  date = "date",
  description = "description",
}

type InputValueWithValidation<T = string> = {
  value: T;
  isValid: boolean;
};

interface Props {
  onSubmit: (expenseData: ExpenseRequestBody) => void;
  submitButtonLabel: string;
  onCancel: () => void;
  defaultValues?: Expense;
}

export const ExpenseForm = ({
  onSubmit,
  submitButtonLabel,
  onCancel,
  defaultValues,
}: Props) => {
  const [inputs, setInputs] = useState<{
    amount: InputValueWithValidation;
    date: InputValueWithValidation;
    description: InputValueWithValidation;
  }>({
    amount: {
      value: defaultValues?.amount.toString() ?? "",
      isValid: true,
    },
    date: {
      value: defaultValues?.date
        ? DateUtils.getFormattedDate(defaultValues.date)
        : "",
      isValid: true,
    },
    description: {
      value: defaultValues?.description ?? "",
      isValid: true,
    },
  });

  const inputChangedHandler = (
    inputIdentifier: keyof typeof InputIdentifier,
    value: string
  ) => {
    setInputs((currInputValues) => ({
      ...currInputValues,
      [inputIdentifier]: {
        value,
        isValid: true,
      },
    }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && !!expenseData.amount;
    const dateIsValid =
      expenseData.date.toString().toLowerCase() !== "invalid date";
    const descriptionIsValid = !!expenseData.description.length;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currInputs) => ({
        amount: { value: currInputs.amount.value, isValid: amountIsValid },
        date: { value: currInputs.date.value, isValid: dateIsValid },
        description: {
          value: currInputs.description.value,
          isValid: descriptionIsValid,
        },
      }));
      //   Alert.alert("Invalid Input", "Please check your input values");
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid = Object.keys(inputs).some(
    (inputKey) => !inputs[inputKey as keyof typeof inputs].isValid
  );

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          isValid={inputs.amount.isValid}
          textInputProps={{
            keyboardType: "decimal-pad",
            onChangeText: (enteredAmount) =>
              inputChangedHandler("amount", enteredAmount),
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          isValid={inputs.date.isValid}
          textInputProps={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (enteredDate) =>
              inputChangedHandler("date", enteredDate),
            value: inputs.date.value,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        isValid={inputs.description.isValid}
        textInputProps={{
          multiline: true,
          onChangeText: (enteredDescription) =>
            inputChangedHandler("description", enteredDescription),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          label="Cancel"
          isFlat
          onPress={onCancel}
        />
        <Button
          style={styles.button}
          label={submitButtonLabel}
          onPress={submitHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
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
});
