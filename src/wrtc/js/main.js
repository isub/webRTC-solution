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
			let iceDone = false, iceTimer = null;
			let iceCandidatList = [];
			const configuration = { 'iceServers': [ { 'urls': 'turn:sip.dtco.ru', 'username': 'sip.dtco.ru', 'credential': 'Gh0uy0pG0u0ls' } ] };
			const peerConnection = new RTCPeerConnection( configuration );
			let offerLocal = await peerConnection.createOffer( { 'offerToReceiveAudio': true } );
			console.debug( 'local offer:', offerLocal );
			peerConnection.onicecandidate = function( event ) {
				console.debug( 'onicecandidate:', event );
				if( iceDone ) {
					return;
				}
				if( ! iceTimer ) {
					iceTimer = setTimeout( iceListCompletedCB, 1000 );
				}
				if( event ) {
					if( event.candidate ) {
						iceCandidatList.push( event.candidate );
					}
				} else {
					iceDone = true;
					if( iceTimer ) {
						clearTimeout( iceTimer );
						iceTimer = null;
					}
					iceListCompletedCB();
				}
			}
			function iceListCompletedCB() {
				iceDone = true;
				iceTimer = null;
				console.debug( 'iceListCompletedCB: local offer:', offerLocal );
				console.debug( 'iceListCompletedCB: candidate list:', iceCandidatList );
			}
		}
	}
)();
