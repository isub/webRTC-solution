
var sessionId;

function wrtc_sig_genSessionId() {
	sessionId = ( [1e7]+-1e3+-4e3+-8e3+-1e11 ).replace(
		/[018]/g, c => ( c ^ crypto.getRandomValues( new Uint8Array( 1 ) )[ 0 ] & 15 >> c / 4 ).toString( 16 )
	);
	console.log( 'session-id: ', sessionId );
}

function wrtc_sig_doLogin( login, passw ) {
	request = { 'jsonrpc':      '2.0',
		'method':       'login',
		'params':       {
			'login':		login,
			'passwd':		passw,
			'loginParams':	{},
			'sessid':		sessionId
		},
		'id':   3
	}
}
