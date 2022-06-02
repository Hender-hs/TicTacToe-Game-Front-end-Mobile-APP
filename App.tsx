import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';


/**
 * 0 - Represents empty square.
 * 1 - Represents square selected by Player 1.
 * 2 - Represents square selected by Player 2.
 */
type GameMoviments = {
  "a1": 0 | 1 | 2, 
  "a2": 0 | 1 | 2, 
  "a3": 0 | 1 | 2, 
  "b1": 0 | 1 | 2, 
  "b2": 0 | 1 | 2, 
  "b3": 0 | 1 | 2,
  "c1": 0 | 1 | 2, 
  "c2": 0 | 1 | 2, 
  "c3": 0 | 1 | 2
}

type squareIndex =
  'a1' | 'a2' | 'a3' | 
  'b1' | 'b2' | 'b3' |
  'c1' | 'c2' | 'c3'





export default function App() {

  const [movements, setMovements] = useState<GameMoviments>({} as GameMoviments)

  const allSquares = [
    'a1', 'a2', 'a3', 
    'b1', 'b2', 'b3',
    'c1', 'c2', 'c3'
  ]


  const getSquareColor = (gameMovementsState: GameMoviments, squareIndex: squareIndex) => {
    const emptySquare           = 0
    const playerOneFilledSquare = 1
    const playerTwoFilledSquare = 2

    if (gameMovementsState[squareIndex] === emptySquare)            return '#fff'
    if (gameMovementsState[squareIndex] === playerOneFilledSquare)  return '#000'
    if (gameMovementsState[squareIndex] === playerTwoFilledSquare)  return '#245'
  }




  const setMovementsHandler = (squareIndex: squareIndex) => {
    const gameMovesCopy = Object.create(movements)

    gameMovesCopy[squareIndex] = 1

    setMovements(gameMovesCopy)
  }

  
  
  
  
  
  
  
  
  
  
  const renderSquares = (square: squareIndex | any, index: number) => {

    return (
      <View 
        style={styles.square}
        key={`${square}-square`}
      >
        <ScrollView style={{"backgroundColor": getSquareColor(movements, square)}} >
          <Button 
            title={' '}
            key={`${square}-square button=1`}
            onPress={() => setMovementsHandler(square)}
          />
          <Button 
            title={' '}
            key={`${square}-square button=2`}
            onPress={() => setMovementsHandler(square)}
          />
          <Button 
            title={' '}
            key={`${square}-square button=3`}
            onPress={() => setMovementsHandler(square)}
          />
          <Button 
            title={''}
            key={`${square}-square button=4`}
            onPress={() => setMovementsHandler(square)}
          />
        </ScrollView>
      </View>
    )
  }

  return (
    <View style={styles.body}>
      <Text>
      </Text>
      <View style={styles.container} >
        {allSquares.map(renderSquares)}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  "body": {
    "width": '100%',
    "flex": 1,
    "backgroundColor": 'green',
    "alignItems": 'center',
    "justifyContent": 'center',
  },
  "container": {
    "width": '90%',
    "height": '45%',
    "flexDirection": 'row',
    "flexWrap": "wrap",
    // "backgroundColor": 'blue',
  },
  "square": {
    "width": '33%',
    "height": '33%',
    "borderWidth": 5,
    "borderStyle": 'solid',
    "borderColor": '#000000',
    "backgroundColor": "white"
  }
});
