import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  text: string;
  onDeleteItem: () => void;
}

export const GoalItem = (props: Props) => {
  const { text, onDeleteItem } = props;
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{
          color: "#210644",
        }}
        onPress={(event) => {
          event.preventDefault();
          onDeleteItem();
        }}
        style={({ pressed }) => pressed && styles.goalPressable}
      >
        <Text style={styles.goalText}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  goalPressable: {
    opacity: 0.5,
  },
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
    padding: 8,
  },
});
