
let g_userId = null
let g_userLogin = null
let g_sessionId = null
let g_callId = null
let g_reqId = 0
let g_onAnswerCB = null
let g_onSuccessCB = null
let g_onFailedCB = null

function wrtcs_sig_ReadWSMessage( data ) {
	console.debug( `enter ${arguments.callee.name}:`, arguments );
	let msgJSON
	try {
		msgJSON = JSON.parse( data )
	} catch( err ) {
		g_onFailedCB( arguments.callee.name, ':', 'invalid message format' )
		return
	}
	if( g_onAnswerCB ) {
		g_onAnswerCB( msgJSON )
	}
}
function wrtcs_sig_doLogin( credentials ) {
	console.debug( `enter ${arguments.callee.name}:`, arguments );
	++g_reqId
	g_onAnswerCB = loginRespCB
	g_onSuccessCB = didLoginSuccess
	g_onFailedCB = didLoginFailed
	g_userId = credentials.login
	g_userLogin = credentials.login + '@' + document.domain
	console.debug( 'in function wrtcs_sig_doLogin:', credentials )
	if( ! g_sessionId ) {
		g_sessionId = genGUID()
	}
	wrtcs_ws_init( wrtcs_ui_getVertoURL(), doLogin, connectionFailed, wrtcs_sig_ReadWSMessage )
	function doLogin() {
		console.debug( `enter ${arguments.callee.name}:`, arguments );
		let request = {
			"jsonrpc": "2.0",
			"method": "login",
			"params": { "login": g_userLogin, "passwd": credentials.passw, "sessid": g_sessionId },
			"id": g_reqId
		}
		wrtcs_ws_sendMessage( JSON.stringify( request ) )
	}
	function connectionFailed() {
		console.debug( `enter ${arguments.callee.name}:`, arguments );
	}
}
function didLoginSuccess() {
	console.debug(`enter ${arguments.callee.name}:`, arguments);
	document.getElementById('state-offline').style.display = 'none';
	document.getElementById('state-online').style.display = '';
	document.getElementById('session-control').style.display = '';
}
function didLoginFailed( err ) {
	console.debug(`enter ${arguments.callee.name}:`, arguments);
}
function loginRespCB( respJSON ) {
	console.debug( `enter ${arguments.callee.name}:`, arguments );
	g_onAnswerCB = null
	if( respJSON.id === g_reqId ) {
	} else {
		g_onFailedCB( 'invalid response id' )
		return
	}
	if( respJSON.hasOwnProperty( 'result' ) ) {
		if( respJSON.result.hasOwnProperty( 'sessid' ) ) {
			if( respJSON.result.sessid === g_sessionId ) {
			} else {
				g_onFailedCB( 'invalid response session-id:' )
				return;
			}
		}
		if( respJSON.result.hasOwnProperty( 'message' ) ) {
			if( respJSON.result.message === 'logged in' ) {
				g_onSuccessCB()
			} else {
				console.debug( 'unrecognised response message:', respJSON.result.message )
				g_onFailedCB( 'unexpected response' )
			}
		}
	} else if( respJSON.hasOwnProperty( 'error' ) ) {
		if( respJSON.error.hasOwnProperty( 'message' ) ) {
			g_onFailedCB( respJSON.error.message )
		} else {
			g_onFailedCB( 'undefined error' )
		}
	} else {
		g_onFailedCB( 'unexpected error' )
	}
}
function wrtcs_sig_sendInvite( sdp, destinationNumber, onSuccess, onFailed ) {
	console.debug( `enter ${arguments.callee.name}:`, arguments );
	g_callId = genGUID()
	++g_reqId;
	g_onAnswerCB = inviteRespCB
	g_onSuccessCB = onSuccess;
	g_onFailedCB = onFailed;
	let request = {
		"jsonrpc": "2.0",
		"method": "verto.invite",
		"params": {
			"sdp": sdp.sdp,
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
	console.debug( `${arguments.callee.name}: ${request}` );
	wrtcs_ws_sendMessage( JSON.stringify( request ) );
}
function inviteRespCB( respJSON ) {
	console.debug( `enter ${arguments.callee.name}:`, arguments )
}
function genGUID() {
	console.debug( `enter ${arguments.callee.name}`, arguments )
	return ( [1e7]+-1e3+-4e3+-8e3+-1e11 ).replace(
		/[018]/g, c => ( c ^ crypto.getRandomValues( new Uint8Array( 1 ) )[ 0 ] & 15 >> c / 4 ).toString( 16 )
	)
}
