import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Squares } from './src/components/squares';
import { useWebsocketServer } from './src/context/websocket';
import * as initStyles from './src/styles/init/init.styles'

const allSquares = [
	'a1', 'a2', 'a3', 
	'b1', 'b2', 'b3',
	'c1', 'c2', 'c3'
]

type sessionInfo = {
	"room_id": string, 
	"guest_id": string
}

export default function Init() {

	const {wsConnectionMethods, isWsUp, wsMessage, wsError} = useWebsocketServer()

	const [guestId, setGuestId] = useState<string | null>(null)
	const [roomId, setRoomId] = useState<string | null>(null)

	const [newRoomId, setNewRoomId] = useState<string | null>(null)
	const [hostId, setHostId] = useState<string | null>(null)

	const WsHandler = () => {

		const cnnSessionId = JSON.parse(wsMessage).cnn_session_id

		if (!cnnSessionId) {
			console.error('cnn session id not received')
			return
		}

		const ADD_GUEST_REQUEST = guestId && roomId
		const CREATE_ROOM_REQUEST = newRoomId && hostId

		let payload = {}

		if (ADD_GUEST_REQUEST) payload = { 
			"type": "add_guest", 
			"guest_id": guestId, 
			"room_id": roomId,
			"cnn_session_id": cnnSessionId 
		}

		if (CREATE_ROOM_REQUEST) payload = {
			"type": 'create_room',
			"room_id": newRoomId,
			"host_id": hostId,
			"host": {}, 
			"cnn_session_id": cnnSessionId
		}

		console.log(JSON.stringify(payload))

		wsConnectionMethods.sendMessage(JSON.stringify(payload))

		console.log(wsConnectionMethods)
	}

	const [movements, setMovements] = useState<GameMoviments>({} as GameMoviments)

	return (
		<View style={initStyles.styles.body}>

			<View style={{"marginBottom": 100}}>
				<TextInput 
					onChange={({ "nativeEvent": { text } }) => setNewRoomId(text)}
					placeholder="set room id"
					/>
				<TextInput 
					onChange={({ "nativeEvent": { text } }) => setHostId(text)}
					placeholder="set host id"
					/>
				<Button 
					title='Create room' 
					onPress={WsHandler} 
					disabled={!hostId || !newRoomId}
					/>
			</View>

			<View>
				<TextInput 
					onChange={({ "nativeEvent": { text } }) => setGuestId(text)}
					placeholder="set user UUID"
					/>
				<TextInput 
					onChange={({ "nativeEvent": { text } }) => setRoomId(text)}
					placeholder="set room id"
					/>
				<Button 
					title='Enter in the room' 
					onPress={WsHandler} 
					disabled={!guestId}
					/>
			</View>
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