import * as Location from "expo-location";
import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";

export default function App() {
  const [errorMsg, setErrorMsg] = useState("");

  const getUserLocationHandler = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      return setErrorMsg("Permission to access location was denied");
    }

    const location = await Location.getCurrentPositionAsync();
    console.log({ location });
  };

  return (
    <View style={styles.container}>
      <Button title="Get Location" onPress={getUserLocationHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
