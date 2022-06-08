import { WebSocketProvider } 	from './websocket'
import { ReactNode }			from 'react'

type ProviderType = {
	"children": ReactNode
}

export const Providers = ({children}: ProviderType) => (
	<WebSocketProvider>
		{children}
	</WebSocketProvider>
)