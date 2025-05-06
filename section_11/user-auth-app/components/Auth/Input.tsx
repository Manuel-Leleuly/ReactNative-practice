import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../../constants/styles";

interface Props {
  label: string;
  onUpdateValue: (text: string) => void;
  value: string;
  isInvalid: boolean;
  keyboardType?: KeyboardTypeOptions;
  secure?: boolean;
}

export const Input = (props: Props) => {
  const { label, keyboardType, secure, onUpdateValue, value, isInvalid } =
    props;

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
