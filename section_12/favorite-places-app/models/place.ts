import { LatLng } from "react-native-maps";

export type LocationData = LatLng & {
  address: string;
};

export class Place {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  location: LatLng;

  constructor(
    title: string,
    imageUri: string,
    location: LocationData,
    id?: string
  ) {
    this.id = id ?? new Date().toString() + Math.random().toString;
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = location;
  }
}
