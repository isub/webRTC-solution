
let webSock = null
let onMessage_cb = null

function wrtcs_ws_close() {
	if( webSock ) {
		webSock.close()
		g_state = stateEnum.wsNotConnected
		webSock = null
	}
}
function wrtcs_ws_init( wssURL, callback ) {
	let attemptsCount = 0
	let connectionTimer = null
	let connectionEstablished = false
	console.debug( `enter ${arguments.callee.name}:`, arguments )
	if( g_state === stateEnum.wsNotConnected && ! webSock ) {
		webSock = new WebSocket( wssURL )
		waitForConnectionCompletion()
		function waitForConnectionCompletion() {
			connectionTimer = setTimeout( connectionTimedOut, 100 )
			function connectionTimedOut() {
				if( ! connectionEstablished ) {
					++ attemptsCount
					connectionTimer = null
					if( 50 < attemptsCount ) {
						waitForConnectionCompletion()
					} else {
						return false
					}
				}
			}
		}
		webSock.onopen = function() {
			console.debug( `enter ${arguments.callee.name}:`, 'web-socket connection is established successfully' )
			clearTimeout( connectionTimer )
			connectionTimer = null
			connectionEstablished = true
			return true
		}
		webSock.onclose = function( event ) {
			if( event.wasClean ) {
				console.debug( 'web socket connection is closed gracefully' )
			} else {
				console.debug( 'web socket connection failed:', event.reason )
			}
		}
		onMessage_cb = callback
		webSock.onmessage = onMessage
		webSock.onerror = function( event ) {
			console.debug( 'an error occurred on web socket:', event )
			return false
		}
	} else {
		console.log( `${arguments.callee.name}:`, 'already connected' )
		return true
	}

	return connectionEstablished
}
function wrtcs_ws_sendMessage( message ) {
	console.debug( `enter ${arguments.callee.name}:`, arguments )
	webSock.send( message )
}
function onMessage( event ) {
	console.debug( `enter ${arguments.callee.name}:`, arguments )
	if( event.isTrusted ) {
	} else {
		console.log( `${arguments.callee.name}: it has got untrusted message` )
		return
	}
	onMessage_cb( event.data )
}
