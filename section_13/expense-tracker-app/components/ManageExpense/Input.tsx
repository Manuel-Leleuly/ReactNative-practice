import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

interface Props {
  label: string;
  isValid?: boolean;
  style?: StyleProp<ViewStyle>;
  textInputProps?: Omit<TextInputProps, "style">;
}

export const Input = ({ label, style, textInputProps, isValid }: Props) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, isValid === false && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          !!textInputProps?.multiline && styles.inputMultiline,
          isValid === false && styles.invalidInput,
        ]}
        {...textInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
