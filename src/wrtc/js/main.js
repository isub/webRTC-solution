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
			let iceCandidateList = [];
			let configuration = { 'iceServers': [ { 'urls': 'turn:sip.dtco.ru', 'username': 'sip.dtco.ru', 'credential': 'Gh0uy0pG0u0ls' } ] };
			config.bundlePolicy = "max-compat";
			config.sdpSemantics = "plan-b";
			let peerConnection = new RTCPeerConnection( configuration );
			let localOffer = await peerConnection.createOffer( { 'offerToReceiveAudio': true } );
			console.debug( 'makeCall: local offer:', localOffer );
			peerConnection.setLocalDescription( localOffer );
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
						iceCandidateList.push( event.candidate );
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
				console.debug( 'iceListCompletedCB: candidate list:', iceCandidateList );
				console.debug( 'iceListCompletedCB: local offer:', peerConnection.localDescription );
			}
		}
	}
)();
