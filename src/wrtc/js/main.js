(
	function () {
		document.addEventListener( "DOMContentLoaded", docLoaded );
		document.getElementById( 'login-btn' ).addEventListener( 'click', doLogin );
		document.getElementById( 'settings-btn' ).addEventListener( 'click', openSettings );
		document.getElementById( 'make-call-btn' ).addEventListener( 'click', makeCall );
		function docLoaded() {
			console.debug( 'enter ${Function.name}:', arguments )
			wrtc_ui_init();
			wrtc_ui_deviceList();
			wrtc_ui_vertoURL();
			wrtc_ws_init( document.getElementById( 'verto-url' ).value, wrtcs_sig_ReadWSMessage );
		}
		function doLogin() {
			console.debug( 'enter ${Function.name}:',arguments )
			let credentials = wrtc_ui_onLogin();
			wrtcs_sig_doLogin( credentials, didLoginSuccess, didLoginFailed );
		}
		function didLoginSuccess() {
			console.debug( 'enter ${Function.name}:', arguments )
			document.getElementById( 'state-offline' ).style.display = 'none';
			document.getElementById( 'state-online' ).style.display = '';
			document.getElementById( 'session-control' ).style.display = '';
		}
		function didLoginFailed( err ) {
			console.debug( 'enter ${Function.name}:', arguments )
		}
		function openSettings() {
			console.debug( 'enter ${Function.name}:', arguments )
			if( document.getElementById( 'settings' ).style.display === 'none' ) {
				document.getElementById( 'settings' ).style.display = '';
			} else {
				document.getElementById( 'settings' ).style.display = 'none';
			}
		}
		async function makeCall() {
			console.debug( 'enter ${Function.name}:', arguments )
			let destinationNumber = document.getElementById( 'dialed-number' ).value;
			let iceDone = false, iceTimer = null;
			let iceCandidateList = [];
			let conf = { 'iceServers': [ { 'urls': 'turn:sip.dtco.ru', 'username': 'sip.dtco.ru', 'credential': 'Gh0uy0pG0u0ls' } ] };
			conf.bundlePolicy = "max-compat";
			let peerConnection = new RTCPeerConnection( conf );
			let localOffer = await peerConnection.createOffer( { 'offerToReceiveAudio': true } );
			console.debug( 'makeCall: local offer:', localOffer );
			await peerConnection.setLocalDescription( localOffer );
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
				console.debug( 'enter ${Function.name}:', arguments )
				iceDone = true;
				iceTimer = null;
				console.debug( 'iceListCompletedCB: candidate list:', iceCandidateList );
				console.debug( 'iceListCompletedCB: local offer:', peerConnection.localDescription );
				wrtcs_sig_sendInvite( peerConnection.localDescription, destinationNumber, didInviteSuccessCB, didInviteFailedCB );
				function didInviteSuccessCB( ) {
					console.debug( 'enter ${Function.name}:', arguments )
				}
				function didInviteFailedCB() {
					console.debug( 'enter ${Function.name}:', arguments )
				}
			}
		}
	}
)();
