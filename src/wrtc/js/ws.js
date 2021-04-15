
let webSock = null
let onMessage_cb = null

function wrtcs_ws_close() {
	if( webSock ) {
		webSock.close();
		g_state = stateEnum.wsNotConnected;
	}
}
function wrtcs_ws_init( wssURL, callback ) {
	console.debug( `enter ${arguments.callee.name}:`, arguments );
	if( g_state === stateEnum.wsNotConnected && ! webSock ) {
		webSock = new WebSocket( wssURL )
		webSock.onopen = function() {
			console.debug( 'web socket connection is established successfully' )
		}
		webSock.onclose = function( event ) {
			if( event.wasClean ) {
				console.debug( 'web socket connection is closed gracefully' )
			} else {
				console.debug( 'web socket connection failed:', event.reason )
			}
		}
		onMessage_cb = callback
		webSock.onmessage = function( event ) {
			onMessage_cb( event )
		}
		webSock.onerror = function( event ) {
			console.debug( 'an error occurred on web socket:', event )
		}
	} else {
		console.log( `${arguments.callee.name}:`, 'already connected' );
	}
}
function wrtcs_ws_sendMessage( message ) {
	console.debug( `enter ${arguments.callee.name}:`, arguments );
	webSock.send( message )
}
