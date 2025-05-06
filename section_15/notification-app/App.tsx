import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Alert, Button, Platform, StyleSheet, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async (_) => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      console.log({ finalStatus });

      if (finalStatus !== Notifications.PermissionStatus.GRANTED) {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        finalStatus = newStatus;
      }

      console.log({ finalStatus });

      if (finalStatus !== Notifications.PermissionStatus.GRANTED) {
        Alert.alert(
          "Permission required",
          "Push notifications need the appropriate permissions."
        );
        return;
      }

      console.log({ finalStatus });

      Notifications.getExpoPushTokenAsync()
        .then((pushToken) => console.log({ pushToken }))
        .catch((error) => console.error(error));

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    })();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("NOTIFICATION RECEIVED");
        const userName = notification.request.content.data.userName;
        console.log({ userName });
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("NOTIFICATION RESPONSE RECEIVED");
        const userName = response.notification.request.content.data.userName;
        console.log({ userName });
      }
    );

    return () => {
      subscription.remove();
      subscription2.remove();
    };
  }, []);

  const scheduleNotificationHandler = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification",
        body: "This is the body of the notification.",
        data: {
          userName: "Manuel",
        },
      },
      trigger: {
        seconds: 5,
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      },
    });
  };

  const sendPushNotificationHandler = () => {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "", // your push token
        title: "Test - sent from a device!",
        body: "This is a test!",
      }),
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Schedule Notification!!"
        onPress={scheduleNotificationHandler}
      />
      <Button
        title="Send Push Notification"
        onPress={sendPushNotificationHandler}
      />
      <StatusBar style="dark" />
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
