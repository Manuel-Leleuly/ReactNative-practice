import * as SQLite from "expo-sqlite/legacy";
import { Place } from "../models/place";

const database = SQLite.openDatabase("places.db");

export class databaseUtils {
  static init = () => {
    const promise = new Promise<void>((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `
                        CREATE TABLE IF NOT EXISTS places (
                            id INTEGER PRIMARY KEY NOT NULL,
                            title TEXT NOT NULL,
                            imageUri TEXT NOT NULL,
                            address TEXT NOT NULL,
                            lat REAL NOT NULL,
                            lng REAL NOT NULL
                        )
                    `,
          [],
          () => {
            resolve(undefined);
          },
          (_, error) => {
            reject(error);
            return true;
          }
        );
      });
    });

    return promise;
  };

  static insertPlace = (place: Place) => {
    const promise = new Promise<SQLite.SQLResultSet>((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
          [
            place.title,
            place.imageUri,
            place.address,
            place.location.latitude,
            place.location.longitude,
          ],
          (_, result) => {
            console.log({ result });
            resolve(result);
          },
          (_, error) => {
            reject(error);
            return true;
          }
        );
      });
    });

    return promise;
  };

  static fetchPlaces = () => {
    const promise = new Promise<Place[]>((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM places",
          [],
          (_, result) => {
            const places: Place[] = result.rows._array.reduce<Place[]>(
              (acc, dp) =>
                acc.concat(
                  new Place(
                    dp.title,
                    dp.imageUri,
                    {
                      address: dp.address,
                      latitude: dp.lat,
                      longitude: dp.lng,
                    },
                    dp.id
                  )
                ),
              []
            );

            resolve(places);
          },
          (_, error) => {
            reject(error);
            return true;
          }
        );
      });
    });

    return promise;
  };

  static fetchPlaceDetails = (id: string) => {
    const promise = new Promise<Place>((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM places WHERE id = ?`,
          [id],
          (_, result) => {
            const placeObj = result.rows._array[0];
            resolve(
              new Place(
                placeObj.title,
                placeObj.imageUri,
                {
                  address: placeObj.address,
                  latitude: placeObj.lat,
                  longitude: placeObj.lng,
                },
                placeObj.id
              )
            );
          },
          (_, error) => {
            reject(error);
            return true;
          }
        );
      });
    });

    return promise;
  };
}
