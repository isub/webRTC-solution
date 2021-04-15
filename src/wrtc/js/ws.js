
let webSock
let onMessage_cb

function wrtcs_ws_init( wssURL, callback ) {
	console.debug( `enter ${arguments.callee.name}:`, arguments );
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
}
function wrtcs_ws_sendMessage( message ) {
	console.debug( `enter ${arguments.callee.name}:`, arguments );
	webSock.send( message )
}
