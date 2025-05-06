import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { GuessLogItem } from "../components/game/GuessLogItem";
import { NumberContainer } from "../components/game/NumberContainer";
import { Card } from "../components/ui/Card";
import { InstructionText } from "../components/ui/InstructionText";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Title } from "../components/ui/Title";
import { generateRandomBetween } from "../helpers/helpers";

enum Direction {
  lower,
  greater,
}

let minBoundary = 1;
let maxBoundary = 100;

interface Props {
  userNumber: number;
  onGameOver: (numberOfRounds: number) => void;
}

export const GameScreen = ({ userNumber, onGameOver }: Props) => {
  const [currentGuess, setCurrentGuess] = useState<number>(
    generateRandomBetween(1, 100, userNumber)
  );
  const [guessRounds, setGuessRounds] = useState<number[]>([]);

  useEffect(() => {
    if (currentGuess === userNumber) onGameOver(guessRounds.length);
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = (direction: Direction) => {
    const invalidLower =
      direction === Direction.lower && currentGuess < userNumber;
    const invalidGreater =
      direction === Direction.greater && currentGuess > userNumber;

    if (invalidLower || invalidGreater) {
      Alert.alert("Dont lie!", "You know that this is wrong...", [
        {
          text: "Sorry!",
          style: "cancel",
        },
      ]);
      return;
    }

    if (direction === Direction.lower) {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  };

  const guessRoundListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler(Direction.lower)}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler(Direction.greater)}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
