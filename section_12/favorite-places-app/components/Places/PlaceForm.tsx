import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import { LocationData, Place } from "../../models/place";
import { Button } from "../UI/Button";
import { ImagePicker } from "./ImagePicker";
import { LocationPicker } from "./LocationPicker";

interface Props {
  onCreatePlace: (placeData: Place) => void;
}

export const PlaceForm = ({ onCreatePlace }: Props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [pickedLocation, setPickedLocation] = useState<LocationData | null>(
    null
  );

  const changeTitleHandler = (title: string) => {
    setEnteredTitle(title);
  };

  const savePlaceHandler = () => {
    if (!pickedLocation) return;
    onCreatePlace(new Place(enteredTitle, selectedImage, pickedLocation));
  };

  const takeImageHandler = (imageUri: string) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback((locationData: LocationData) => {
    setPickedLocation(locationData);
  }, []);

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
          autoCorrect={false}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler} label="Add Place" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
