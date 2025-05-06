import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import { GoalInput } from "./components/GoalInput";
import { GoalItem } from "./components/GoalItem";

enum Modals {
  input,
}

export default function App() {
  const [courseGoals, setCourseGoals] = useState<
    { text: string; id: string }[]
  >([]);
  const [selectedModal, setSelectedModal] = useState<Modals | null>(null);

  const startAddGoalHandler = () => {
    setSelectedModal(Modals.input);
  };

  const endAddGoalHandler = () => {
    setSelectedModal(null);
  };

  const addGoalHandler = (enteredGoalText: string) => {
    setCourseGoals((prevGoals) =>
      prevGoals.concat({ text: enteredGoalText, id: Math.random().toString() })
    );
    endAddGoalHandler();
  };

  const deleteGoalHandler = (id: string) => {
    setCourseGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#a065ec"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          addGoalHandler={addGoalHandler}
          isVisible={selectedModal === Modals.input}
          onCancel={endAddGoalHandler}
        />

        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => (
              <GoalItem
                text={itemData.item.text}
                onDeleteItem={() => deleteGoalHandler(itemData.item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
