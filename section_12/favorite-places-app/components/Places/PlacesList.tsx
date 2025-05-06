import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/place";
import { useRootNavigation } from "../../routes/routes";
import { PlaceItem } from "./PlaceItem";

interface Props {
  places: Place[];
}

export const PlacesList = ({ places }: Props) => {
  const navigation = useRootNavigation();

  const selectPlaceHandler = (id: string) => {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    });
  };

  if (!places.length) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(place) => place.id}
      renderItem={({ item: place }) => (
        <PlaceItem place={place} onSelect={selectPlaceHandler} />
      )}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
