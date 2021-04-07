(
	function () {
		document.addEventListener( "DOMContentLoaded", docLoaded );
		document.getElementById( 'login-btn' ).addEventListener( 'click', doLogin );
		document.getElementById( 'settings-btn' ).addEventListener( 'click', openSettings );
		function docLoaded() {
			wrtc_ui_init();
			wrtc_ui_deviceList();
			wrtc_ui_vertoURL();
			wrtc_sig_genSessionId();
			wrtc_ws_init( document.getElementById( 'verto-url' ).value );
		}
		function doLogin() {
			console.log( 'in function doLogin' );
			credentials = wrtc_ui_onLogin();
			wrtc_sig_doLogin( credentials, didLoginSuccess, didLoginFailed );
		}
		function didLoginSuccess() {
		}
		function didLoginFailed( err ) {
			console.log( 'authentification failed:', err );
		}
		function openSettings() {
			if( document.getElementById( 'settings' ).style.display === 'none' ) {
				document.getElementById( 'settings' ).style.display = '';
			} else {
				document.getElementById( 'settings' ).style.display = 'none';
			}
		}
		async function makeCall() {
			const configuration = { 'iceServers': [ { 'urls': 'turn:sip.dtco.ru', 'username': 'sip.dtco.ru', 'credential': 'Gh0uy0pG0u0ls' } ] };
			const peerConnection = new RTCPeerConnection( configuration );
			let offerLocal = await peerConnection.createOffer( { 'offerToReceiveAudio': true } );
			console.log( 'local offer:', offerLocal );
			offerLocal = await peerConnection.createOffer( { 'offerToReceiveAudio': false } );
			console.log( 'local offer:', offerLocal );
		}
	}
)();
