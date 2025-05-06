import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { LatLng, MapPressEvent, Marker } from "react-native-maps";
import { IconButton } from "../components/UI/IconButton";
import { useRootNavigation, useRootRoute } from "../routes/routes";

export const Map = () => {
  const navigation = useRootNavigation();
  const route = useRootRoute<"Map">();

  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(
    () => {
      if (!route.params) return null;
      return { ...route.params };
    }
  );

  const selectLocationHandler = (event: MapPressEvent) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ latitude: lat, longitude: lng });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping on the map) first!"
      );
      return;
    }

    navigation.navigate("AddPlace", selectedLocation);
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (route.params) return;
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, route]);

  return (
    <MapView
      initialRegion={{
        latitude: route.params?.latitude ?? 37.78,
        longitude: route.params?.longitude ?? -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker title="Picked Location" coordinate={selectedLocation} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
