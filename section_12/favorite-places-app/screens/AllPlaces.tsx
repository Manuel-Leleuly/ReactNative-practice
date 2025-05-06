import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { PlacesList } from "../components/Places/PlacesList";
import { Place } from "../models/place";
import { databaseUtils } from "../utils/database";

export const AllPlaces = () => {
  // const route = useRootRoute<"AllPlaces">();
  const isFocused = useIsFocused();

  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);

  useEffect(() => {
    (async () => {
      if (isFocused) {
        const places = await databaseUtils.fetchPlaces();
        setLoadedPlaces(places);
        // const { place } = route.params;
        // setLoadedPlaces((currPlaces) => currPlaces.concat(place));
      }
    })();
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};
