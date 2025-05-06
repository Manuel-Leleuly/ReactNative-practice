import {
  Image,
  ImageStyle,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Title } from "../components/ui/Title";
import { Colors } from "../constants/colors";

const successPng = require("../assets/images/success.png");

interface Props {
  roundsNumber: number;
  userNumber: number;
  onStartNewGame: () => void;
}

export const GameOverScreen = ({
  roundsNumber,
  onStartNewGame,
  userNumber,
}: Props) => {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;
  if (width < 380) imageSize = 150;
  if (height < 400) imageSize = 80;

  const imageStyle: StyleProp<ImageStyle> = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>Game over!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image source={successPng} style={styles.image} />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highlight}>{userNumber}</Text>
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
};

// const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
