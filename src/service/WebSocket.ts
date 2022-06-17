import { Options } from 'react-native-use-websocket';
import useWebSocket from 'react-native-use-websocket';
import { WebSocketHook } from 'react-native-use-websocket/lib/typescript/src/lib/types';

interface WSOptionMethods {
	"onOpen": () => void,
	"onClose": () => void,
	"onMessage": (message: string) => void,
	"onError": (error: any) => void,
	"onReconnectStop": () => void
}

export class WS {

	"setIsWsUpState": any
	"setWsMessageState": any
	"setWsErrorState": any
	"cnnSessionIdState": number | null
	"setCnnSessionIdState": Function

	constructor(setIsWsUpState: Function, setWsMessageState: Function, setWsErrorState: Function, cnnSessionIdState: number | null, setCnnSessionIdState: Function) {
		this.setIsWsUpState 	= setIsWsUpState
		this.setWsMessageState 	= setWsMessageState
		this.setWsErrorState 	= setWsErrorState
		this.cnnSessionIdState = cnnSessionIdState
		this.setCnnSessionIdState = setCnnSessionIdState
	}
	
	private onOpen() {
		this.setIsWsUpState(true)
		console.log('websocket connection was opened')
	}

	private onClose(event: WebSocketCloseEvent) {
		this.setIsWsUpState(false)
		console.log('websocket connection closed  -  ', event)
	}

	private onMessage(message: WebSocketMessageEvent) {

		if (!this.cnnSessionIdState === null) {
			const cnnSessId = JSON.parse(message.data).cnn_session_id
			if (!cnnSessId) {
				const errorMsg = 'session id not set and not received'
				console.error(errorMsg)
				this.onClose({} as WebSocketMessageEvent)
				return
			}

			this.setCnnSessionIdState(cnnSessId)
		}
		this.setWsMessageState(message.data)
		console.log('ws message: ', message)
	}

	private onError(error: WebSocketEventMap['error']) {
		this.setWsErrorState(error)
	}

	private onReconnectStop(numAttempts: number) {
		console.log('On reconnection --- numAttempts: ', numAttempts)
	}

	public getWSOptionsMethods(binder: Object) {
		const allMethods: Options = {
			"onOpen": this.onOpen.bind(binder),
			"onClose": this.onClose.bind(binder),
			"onMessage": this.onMessage.bind(binder),
			"onError": this.onError.bind(binder),
			"onReconnectStop": this.onReconnectStop.bind(binder)
		}
		return allMethods
	}

}

