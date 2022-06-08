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

	constructor(setIsWsUpState: Function, setWsMessageState: Function, setWsErrorState: Function) {
		this.setIsWsUpState 	= setIsWsUpState
		this.setWsMessageState 	= setWsMessageState
		this.setWsErrorState 	= setWsErrorState
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

