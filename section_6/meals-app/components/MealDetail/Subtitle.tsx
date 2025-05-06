import { StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
}

export const Subtitle = ({ title }: Props) => {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: "#e2b497",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitleContainer: {
    padding: 6,
    marginHorizontal: 12,
    marginVertical: 4,
    borderBottomColor: "#e2b497",
    borderBottomWidth: 3,
  },
});
