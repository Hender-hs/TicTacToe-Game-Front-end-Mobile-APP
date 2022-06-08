import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Squares } from './src/components/squares';
import { useWebsocketServer } from './src/context/websocket';
import * as initStyles from './src/styles/init/init.styles'

const allSquares = [
	'a1', 'a2', 'a3', 
	'b1', 'b2', 'b3',
	'c1', 'c2', 'c3'
]


export default function Init() {

	const {wsConnectionMethods, isWsUp, wsMessage, wsError} = useWebsocketServer()

	const WsHandler = () => {
		console.log(wsConnectionMethods)

		wsConnectionMethods.sendMessage('{"msg": "olá"}')

		console.log(wsConnectionMethods)
	}

	const [movements, setMovements] = useState<GameMoviments>({} as GameMoviments)

	return (
		<View style={initStyles.styles.body}>
			<Button title='open connection' onPress={WsHandler} />
			<Text>
				{`connection: ${isWsUp}`}
				{wsMessage && `lastMessage: ${wsMessage}`}
				{wsError && `lastError: ${wsError}`}
			</Text>
			<View style={initStyles.styles.container} >
			  {
			    allSquares.map(
			      (square: string, index: number) => 
			        <Squares 
						key={`${square} ${index}`} 
						square={square} 
						movementsState={movements} 
						setMovementsState={setMovements} 
						index={index} 
					/>
				)
			  }
			</View>
		</View>
  	)
}