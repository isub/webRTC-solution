
var g_userId;
var g_userLogin;
var g_sessionId;
var g_callId;
var g_reqId = 0;
var g_onSuccessCB;
var g_onFailedCB;

function wrtc_sig_doLogin( credentials, onSuccess, onFailed ) {
	g_sessionId = genGUID();
	++g_reqId;
	g_onSuccessCB = onSuccess;
	g_onFailedCB = onFailed;
	g_userId = credentials.login;
	g_userLogin = credentials.login + '@' + document.domain;
	console.debug( 'in function wrtc_sig_doLogin:', credentials );
	request = {"jsonrpc":"2.0","method":"login","params":{"login":g_userLogin,"passwd":credentials.passw,"sessid":g_sessionId},"id":g_reqId};
	console.debug( 'in function wrtc_sig_doLogin:', request );
	wrtc_ws_sendMessage( JSON.stringify( request ), wrtc_sig_doLoginRespCB );
}
function wrtc_sig_doLoginRespCB( event ) {
	console.debug( 'in function wrtc_sig_doLoginRespCB:', event );
	if( event.isTrusted ) {
	} else {
		g_onFailedCB( 'untrusted response' );
		return;
	}
	try {
		respJSON = JSON.parse( event.data );
	} catch( err ) {
		g_onFailedCB( 'invalid response format' );
		return;
	}
	if( respJSON.id === g_reqId ) {
	} else {
		console.debug( 'invalid response id:', event.data );
		g_onFailedCB( 'invalid response id' );
		return;
	}
	if( respJSON.hasOwnProperty( 'result' ) ) {
		if( respJSON.result.hasOwnProperty( 'sessid' ) ) {
			if( respJSON.result.sessid === g_sessionId ) {
			} else {
				console.debug( 'invalid response session-id:', respJSON.result.sessid );
				g_onFailedCB( 'invalid response session-id!!!' );
				return;
			}
		}
		if( respJSON.result.hasOwnProperty( 'message' ) ) {
			if( respJSON.result.message === 'logged in' ) {
				g_onSuccessCB();
			} else {
				console.debug( 'unrecognised response message:', respJSON.result.message );
				g_onFailedCB( 'unexpected response' );
				return;
			}
		}
	} else if( respJSON.hasOwnProperty( 'error' ) ) {
		if( respJSON.error.hasOwnProperty( 'message' ) ) {
			g_onFailedCB( respJSON.error.message );
			return;
		} else {
			g_onFailedCB( 'undefined error' );
			return;
		}
	} else {
		g_onFailedCB( 'unexpected error' );
		return;
	}
}
function wrtc_sig_sendInvite( sdp, destinationNumber, onSuccess, onFailed ) {
	g_callId = genGUID();
	++g_reqId;
	g_onSuccessCB = onSuccess;
	g_onFailedCB = onFailed;
	console.debug( 'in function wrtc_sig_sendInvite:', sdp, destinationNumber );
	request = {
		"jsonrpc": "2.0",
		"method": "verto.invite",
		"params": {
			"sdp": sdp,
			"dialogParams": {
				"useVideo": false,
				"useStereo": false,
				"screenShare": false,
				"useMic": "any",
				"useSpeak": "any",
				"tag":  "webcam",
				"localTag": null,
				"login": g_userLogin,
				"videoParams": {
					"minWidth":     "1280",
					"minHeight":    "720",
					"minFrameRate": 30
				},
				"useStream": null,
				"destination_number": destinationNumber,
				"caller_id_name": "FreeSWITCH User",
				"caller_id_number": g_userId,
				"callID": g_callId,
				"remote_caller_id_name": "Outbound Call",
				"remote_caller_id_number": destinationNumber
			},
			"sessid": g_sessionId
		},
		"id": g_reqId
	};
	console.debug( 'in function wrtc_sig_doLogin:', request );
	wrtc_ws_sendMessage( JSON.stringify( request ), wrtc_sig_sendInviteRespCB );
}
function wrtc_sig_sendInviteRespCB( event ) {
	console.debug( 'in function wrtc_sig_doLoginRespCB:', event );
}
function genGUID() {
	let retVal = ( [1e7]+-1e3+-4e3+-8e3+-1e11 ).replace(
		/[018]/g, c => ( c ^ crypto.getRandomValues( new Uint8Array( 1 ) )[ 0 ] & 15 >> c / 4 ).toString( 16 )
	);
	console.debug( 'session-id:', retVal );
	return retVal;
}
