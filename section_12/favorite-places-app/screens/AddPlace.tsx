import { PlaceForm } from "../components/Places/PlaceForm";
import { Place } from "../models/place";
import { useRootNavigation } from "../routes/routes";
import { databaseUtils } from "../utils/database";

export const AddPlace = () => {
  const navigation = useRootNavigation();

  const createPlaceHandler = async (place: Place) => {
    await databaseUtils.insertPlace(place);
    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};
