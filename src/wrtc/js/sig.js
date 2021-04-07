
var sessionId;
var reqId = 0;
var onSuccessCB;
var onFailedCB;

function wrtc_sig_genSessionId() {
	sessionId = ( [1e7]+-1e3+-4e3+-8e3+-1e11 ).replace(
		/[018]/g, c => ( c ^ crypto.getRandomValues( new Uint8Array( 1 ) )[ 0 ] & 15 >> c / 4 ).toString( 16 )
	);
	console.log( 'session-id: ', sessionId );
}
function wrtc_sig_doLogin( credentials, onSuccess, onFailed ) {
	++reqId;
	onSuccessCB = onSuccess;
	onFailedCB = onFailed;
	let login = credentials.login + '@' + document.domain;
	console.debug( 'in function wrtc_sig_doLogin: ', credentials );
	request = {"jsonrpc":"2.0","method":"login","params":{"login":login,"passwd":credentials.passw,"sessid":sessionId},"id":reqId};
	console.debug( 'in function wrtc_sig_doLogin: ', request );
	wrtc_ws_sendMessage( JSON.stringify( request ), wrtc_sig_doLoginResp );
}
function wrtc_sig_doLoginResp( event ) {
	console.debug( 'in function wrtc_sig_doLoginResp: ', event );
	if( event.isTrusted ) {
	} else {
		return;
	}
	respJSON = JSON.parse( event.data );
	if( respJSON.id === reqId ) {
	} else {
		console.debug( 'invalid response id: ', event.data );
	}
	if( respJSON.hasOwnProperty( 'result' ) ) {
		if( respJSON.hasOwnProperty( 'result.message' ) && respJSON.hasOwnProperty( 'result.sessid' ) ) {
			if( respJSON.result.message === 'logged in' ) {
			} else {
				console.debug( 'unrecognised response message: ', respJSON.result.message );
				onFailedCB();
			}
			if( respJSON.result.sessid === sessionId ) {
			} else {
				console.debug( 'invalid response session-id: ', respJSON.result.sessid );
				onFailedCB( 'invalid response session-id!!!' );
			}
		}
	} else if( respJSON.hasOwnProperty( 'error' ) ) {
		if( respJSON.hasOwnProperty( 'message' ) ) {
			onFailedCB( respJSON.error.message );
		} else {
			onFailedCB( 'undefined error' );
		}
	} else {
		onFailedCB( 'unexpected error' );
	}
}
