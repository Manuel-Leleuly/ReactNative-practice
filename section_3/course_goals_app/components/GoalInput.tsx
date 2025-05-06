import { useState } from "react";
import {
  Button,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

const goalPng = require("../assets/images/goal.png");

interface Props {
  addGoalHandler: (enteredGoalText: string) => void;
  onCancel: () => void;
  isVisible: boolean;
}

export const GoalInput = ({ addGoalHandler, isVisible, onCancel }: Props) => {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  const goalInputHandler = (enteredText: string) => {
    setEnteredGoalText(enteredText);
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image source={goalPng} style={styles.image} />
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={onCancel} color="#f31282" />
          </View>
          <View style={styles.button}>
            <Button
              title="Add Goal"
              onPress={(event) => {
                event.preventDefault();
                addGoalHandler(enteredGoalText);
                setEnteredGoalText("");
              }}
              color="#b180f0"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    borderRadius: 6,
    width: "100%",
    padding: 16,
    color: "#120438",
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});
