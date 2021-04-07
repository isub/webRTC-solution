
var sessionId;
var reqId = 0;
var onSuccessCB;
var onFailedCB;

function wrtc_sig_genSessionId() {
	sessionId = ( [1e7]+-1e3+-4e3+-8e3+-1e11 ).replace(
		/[018]/g, c => ( c ^ crypto.getRandomValues( new Uint8Array( 1 ) )[ 0 ] & 15 >> c / 4 ).toString( 16 )
	);
	console.log( 'session-id:', sessionId );
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
		onFailedCB( 'untrusted response' );
		return;
	}
	try {
		respJSON = JSON.parse( event.data );
	} catch( err ) {
		onFailedCB( 'invalid response format' );
		return;
	}
	if( respJSON.id === reqId ) {
	} else {
		console.debug( 'invalid response id: ', event.data );
		onFailedCB( 'invalid response id' );
		return;
	}
	if( respJSON.hasOwnProperty( 'result' ) ) {
		if( respJSON.result.hasOwnProperty( 'sessid' ) ) {
			if( respJSON.result.sessid === sessionId ) {
			} else {
				console.debug( 'invalid response session-id: ', respJSON.result.sessid );
				onFailedCB( 'invalid response session-id!!!' );
				return;
			}
		}
		if( respJSON.result.hasOwnProperty( 'message' ) ) {
			if( respJSON.result.message === 'logged in' ) {
				onSuccessCB();
			} else {
				console.debug( 'unrecognised response message: ', respJSON.result.message );
				onFailedCB( 'unexpected response' );
				return;
			}
		}
	} else if( respJSON.hasOwnProperty( 'error' ) ) {
		if( respJSON.error.hasOwnProperty( 'message' ) ) {
			onFailedCB( respJSON.error.message );
			return;
		} else {
			onFailedCB( 'undefined error' );
			return;
		}
	} else {
		onFailedCB( 'unexpected error' );
		return;
	}
}
