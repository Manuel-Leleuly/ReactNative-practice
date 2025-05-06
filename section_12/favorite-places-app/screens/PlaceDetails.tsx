import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { OutlinedButton } from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { Place } from "../models/place";
import { useRootNavigation, useRootRoute } from "../routes/routes";
import { databaseUtils } from "../utils/database";

export const PlaceDetails = () => {
  const navigation = useRootNavigation();
  const route = useRootRoute<"PlaceDetails">();

  const [fetchedPlace, setFetchPlace] = useState<Place | null>(null);

  const selectedPlaceId = route.params?.placeId;

  useEffect(() => {
    if (selectedPlaceId) {
      (async () => {
        const place = await databaseUtils.fetchPlaceDetails(selectedPlaceId);
        setFetchPlace(place);
        navigation.setOptions({
          title: place.title,
        });
      })();
    }
  }, [selectedPlaceId]);

  const showOnMapHandler = () => {
    navigation.navigate("Map", fetchedPlace?.location);
  };

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton
          label="View on Map"
          icon="map"
          onPress={showOnMapHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
