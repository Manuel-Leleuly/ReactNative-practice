import { StyleSheet, Text, View } from "react-native";

interface Props {
  dataList: string[];
}

export const List = ({ dataList }: Props) => {
  return (
    <>
      {dataList.map((data, index) => (
        <View key={`${index}-${data}`} style={styles.listItem}>
          <Text style={styles.itemText}>{data}</Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#e2b497",
  },
  itemText: {
    color: "#351401",
    textAlign: "center",
  },
});
