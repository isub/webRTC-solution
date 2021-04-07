
var webSock;
var onMessage_cb;

function wrtc_ws_init( wssURL ) {
	webSock = new WebSocket( wssURL );
	webSock.onopen = function() {
		console.debug( 'web socket connection is established successfully' );
	}
	webSock.onclose = function( event ) {
		if( event.wasClean ) {
			console.debug( 'web socket connection is closed gracefully' );
		} else {
			console.debug( 'web socket connection failed: ', event.reason );
		}
	}
	webSock.onmessage = function( event ) {
		onMessage_cb( event );
	}
	webSock.onerror = function( event ) {
		console.log( 'an error occurred on web socket:', event );
	}
}
function wrtc_ws_sendMessage( message, callback ) {
	onMessage_cb = callback;
	webSock.send( message );
}
