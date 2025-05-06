import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { Colors } from "./constants/colors";
import { GameOverScreen } from "./screens/GameOverScreen";
import { GameScreen } from "./screens/GameScreen";
import { StartGameScreen } from "./screens/StartGameScreen";

const backgroundPng = require("./assets/images/background.png");

export default function App() {
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={backgroundPng}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.safeArea}>
            <AppScreen />
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const AppScreen = () => {
  const [userNumber, setUserNumber] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  const pickedNumberHandler = (pickedNumber: number) => {
    setUserNumber(pickedNumber);
    setIsGameOver(false);
  };

  const gameOverHandler = (numberOfRounds: number) => {
    setIsGameOver(true);
    setGuessRounds(numberOfRounds);
  };

  const startNewGameHandler = () => {
    setUserNumber(null);
    setIsGameOver(false);
    setGuessRounds(0);
  };

  if (isGameOver) {
    return (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber ?? 0}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  if (userNumber) {
    return <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  return <StartGameScreen onPickNumber={pickedNumberHandler} />;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 12,
    paddingTop: 40,
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
