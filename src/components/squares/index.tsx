import { View, ScrollView, Button } from "react-native"
import * as SquareStyles from '../../styles/components/squares/squares.styles'

interface SquaresProps {
	"square": squareIndex | any, 
	"movementsState": any, 
	"setMovementsState": any
	"index": number
}

export const Squares = ({square, movementsState, setMovementsState, index}: SquaresProps) => {

  const getSquareColor = (gameMovementsState: GameMoviments, squareIndex: squareIndex) => {
    	const emptySquare           = 0
    	const playerOneFilledSquare = 1
    	const playerTwoFilledSquare = 2

    	if (gameMovementsState[squareIndex] === emptySquare)            return '#fff'
    	if (gameMovementsState[squareIndex] === playerOneFilledSquare)  return '#000'
    	if (gameMovementsState[squareIndex] === playerTwoFilledSquare)  return '#245'
  	}


	const setMovementsHandler = (squareIndex: squareIndex) => {
    	const gameMovesCopy = Object.create(movementsState)
    	gameMovesCopy[squareIndex] = 1
    	setMovementsState(gameMovesCopy)
  	}

	return (
			<View 
				style={SquareStyles.styles.square}
			>
			<ScrollView style={{"backgroundColor": getSquareColor(movementsState, square)}} >
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