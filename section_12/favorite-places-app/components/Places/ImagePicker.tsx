import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { OutlinedButton } from "../UI/OutlinedButton";

interface Props {
  onTakeImage: (imageUri: string) => void;
}

export const ImagePicker = ({ onTakeImage }: Props) => {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [pickedImage, setPickedImage] = useState("");

  const verifyPermission = async (): Promise<boolean> => {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app"
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;

    const imageResult = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (imageResult.canceled) return;

    setPickedImage(imageResult.assets[0].uri);
    onTakeImage(imageResult.assets[0].uri);
  };

  return (
    <View>
      <View style={styles.imagePreview}>
        {pickedImage.length ? (
          <Image source={{ uri: pickedImage }} style={styles.image} />
        ) : (
          <Text>No image taken yet.</Text>
        )}
      </View>
      <OutlinedButton
        label="Take Image"
        onPress={takeImageHandler}
        icon="camera"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
