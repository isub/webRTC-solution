
let webSock = null
let onMessage_cb = null

function wrtcs_ws_init( wssURL, msgCB ) {
	console.debug( `enter ${arguments.callee.name}:`, arguments )
	wsConnect( wssURL );
	onMessage_cb = msgCB
}
function wrtcs_ws_close() {
	if( webSock ) {
		webSock.close()
		g_state = stateEnum.wsNotConnected
		webSock = null
	}
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
function wsConnect( wssURL ) {
	console.debug( `enter ${arguments.callee.name}:`, arguments );
	let connectTimer = null;
	let success = false;
	if( ! webSock ) {
		webSock = new WebSocket( wssURL );
	}
	connectTimer = setTimeout( onTimeout, 5000 );
	if( connectTimer ) {
		connectTimer = null;
	}
	if( success ) {
		console.debug( `enter ${arguments.callee.name}:`, 'web-socket connection is established successfully' );
	} else {
		console.debug( `enter ${arguments.callee.name}:`, 'web-socket connection establishment is failed' );
	}
	function onTimeout() {
		console.debug( `enter ${arguments.callee.name}:`, 'web-socket connection establishment is timed out' );
		success = false;
	}
	webSock.onopen = function() {
		console.debug( `enter ${arguments.callee.name}:`, 'web-socket connection is established successfully' );
		webSock.onmessage = onMessage;
		success = true;
		clearTimeout( connectTimer );
	}
	webSock.onerror = function( event ) {
		console.debug( 'an error occurred on web socket:', event );
	}
	webSock.onclose = function( event ) {
		if( event.wasClean ) {
			console.debug( 'web socket connection is closed gracefully' );
		} else {
			console.debug( 'web socket connection failed:', event.reason );
		}
	}
	return success;
}
