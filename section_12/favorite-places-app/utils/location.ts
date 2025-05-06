import { LatLng } from "react-native-maps";

export class locationUtils {
  static getMapPreview = ({ latitude, longitude }: LatLng): string => {
    const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
    const searchParams: Record<string, string> = {
      center: `${latitude},${longitude}`,
      zoom: "14",
      size: "400x200",
      mapType: "roadmap",
      markers: `color:red%7Clabel:S%7C${latitude},${longitude}`,
      key: "YOUR_API_KEY",
    };

    return baseUrl + "?" + new URLSearchParams(searchParams).toString();
  };

  static getAddress = async ({
    latitude,
    longitude,
  }: LatLng): Promise<string> => {
    const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json";
    const searchParams: Record<string, string> = {
      latlng: `${latitude},${longitude}`,
      key: "YOUR_API_KEY",
    };

    const response = await fetch(
      `${baseUrl}?${new URLSearchParams(searchParams).toString()}`
    );
    if (!response.ok) throw new Error("Failed to fetch address!");

    const data = await response.json();
    return data.results[0].formatted_address;
  };
}
