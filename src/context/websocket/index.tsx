import { createContext, ReactNode, useEffect, useState } from "react"
import { useContext } 				from "react"
import { WS } from "../../service/WebSocket"
import useWebSocket from 'react-native-use-websocket';
import { WebSocketHook } from "react-native-use-websocket/lib/typescript/src/lib/types";

interface WebSocketContextType {
	"wsConnectionMethods": WebSocketHook<WebSocketMessageEvent>
	"isWsUp": boolean
	"wsMessage": any
	"wsError": any
}

interface WebSocketProviderType {
	"children": ReactNode
}


export const WebSocketContext = createContext<WebSocketContextType>({} as WebSocketContextType)

export const WebSocketProvider = ({children}: WebSocketProviderType) => {

	const [wsConnectionMethods, setWsConnectionMethods] = useState<any>(null)
	const [isWsUp, setIsWsUp] 							= useState<boolean>(false)
	const [wsMessage, setWsMessage] 					= useState<any>(null)
	const [wsError, setWsError] 						= useState<any>(null)

	const wsManager = new WS(setIsWsUp, setWsMessage, setWsError)

	const wsConnection = useWebSocket(`ws://${'0.0.0.0:8080'}`, wsManager.getWSOptionsMethods(wsManager))

	if (!wsConnectionMethods) {
		setWsConnectionMethods(wsConnection)
	}

	return(
		<WebSocketContext.Provider
			value={{wsConnectionMethods, isWsUp, wsMessage, wsError}}
		>
			{children}
		</WebSocketContext.Provider>
	) 
}

export const useWebsocketServer = () => useContext(WebSocketContext)