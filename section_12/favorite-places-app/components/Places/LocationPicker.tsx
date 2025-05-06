import { useIsFocused } from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { LatLng } from "react-native-maps";
import { Colors } from "../../constants/colors";
import { LocationData } from "../../models/place";
import { useRootNavigation, useRootRoute } from "../../routes/routes";
import { locationUtils } from "../../utils/location";
import { OutlinedButton } from "../UI/OutlinedButton";

interface Props {
  onPickLocation: (locationData: LocationData) => void;
}

export const LocationPicker = ({ onPickLocation }: Props) => {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const navigation = useRootNavigation();
  const route = useRootRoute<"AddPlace">();
  const isFocused = useIsFocused();

  const [pickedLocation, setPickedLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.latitude,
        lng: route.params.longitude,
      };
      setPickedLocation(() => {
        if (!mapPickedLocation) return null;
        if (!mapPickedLocation.lat || !mapPickedLocation.lng) return null;
        return {
          latitude: mapPickedLocation.lat,
          longitude: mapPickedLocation.lng,
        };
      });
    }
  }, [route, isFocused]);

  useEffect(() => {
    handleLocation();
  }, [pickedLocation, onPickLocation]);

  const handleLocation = async () => {
    if (pickedLocation) {
      const address = await locationUtils.getAddress(pickedLocation);
      onPickLocation({ ...pickedLocation, address });
    }
  };

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app"
      );
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  return (
    <View>
      <View style={styles.mapPreview}>
        {pickedLocation ? (
          <Image
            style={styles.image}
            source={{
              uri: locationUtils.getMapPreview({ ...pickedLocation }),
            }}
          />
        ) : (
          <Text>No location picked yet.</Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutlinedButton
          label="Locate User"
          icon="location"
          onPress={getLocationHandler}
        />
        <OutlinedButton
          label="Pick on Map"
          icon="map"
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
