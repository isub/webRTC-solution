(
	function () {
		document.addEventListener( "DOMContentLoaded", docLoaded );
		document.getElementById( 'login-btn' ).addEventListener( 'click', doLogin );
		document.getElementById( 'settings-btn' ).addEventListener( 'click', openSettings );
		document.getElementById( 'make-call-btn' ).addEventListener( 'click', makeCall );
		function docLoaded() {
			wrtc_ui_init();
			wrtc_ui_deviceList();
			wrtc_ui_vertoURL();
			wrtc_ws_init( document.getElementById( 'verto-url' ).value );
		}
		function doLogin() {
			console.debug( 'in function doLogin' );
			credentials = wrtc_ui_onLogin();
			wrtc_sig_doLogin( credentials, didLoginSuccess, didLoginFailed );
		}
		function didLoginSuccess() {
			document.getElementById( 'state-offline' ).style.display = 'none';
			document.getElementById( 'state-online' ).style.display = '';
			document.getElementById( 'session-control' ).style.display = '';
		}
		function didLoginFailed( err ) {
			console.debug( 'authentification failed:', err );
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
			console.debug( 'local offer:', offerLocal );
			await peerConnection.setLocalDescription( offerLocal );
			console.debug( 'setLocalDescription:', peerConnection.localDescription );
			peerConnection.onicecandidate = async function( event ) {
				console.debug( 'onicecandidate:', event );
				if( event.candidate !== null ) {
					await peerConnection.addIceCandidate( event.candidate );
				} else {
					console.debug( 'local offer:', peerConnection.localDescription );
				}
			}
		}
	}
)();
