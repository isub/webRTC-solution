(
	function () {
		document.addEventListener( "DOMContentLoaded", docLoaded );
		document.getElementById( 'login-btn' ).addEventListener( 'click', doLogin );
		document.getElementById( 'settings-btn' ).addEventListener( 'click', openSettings );
		navigator.mediaDevices.addEventListener(
			'devicechange',
			event => {
				wrtc_ui_deviceList();
			}
		);
		function docLoaded() {
			wrtc_ui_deviceList();
			wrtc_sig_genSessionId();
		}
		function doLogin() {
			console.log( 'in function doLogin' );
			credentials = wrtc_ui_onLogin();
			wrtc_sig_doLogin( credentials );
		}
		function openSettings() {
			if( document.getElementById( 'settings' ).hidden ) {
				document.getElementById( 'settings' ).hidden = false;
			} else {
				document.getElementById( 'settings' ).hidden = true;
			}
		}
		async function makeCall() {
			const configuration = { 'iceServers': [ { 'urls': 'turn:sip.dtco.ru', 'username': 'sip.dtco.ru', 'credential': 'Gh0uy0pG0u0ls' } ] };
			const peerConnection = new RTCPeerConnection( configuration );
			let offerLocal = await peerConnection.createOffer( { 'offerToReceiveAudio': true } );
			console.log( 'local offer: ', offerLocal );
			offerLocal = await peerConnection.createOffer( { 'offerToReceiveAudio': false } );
			console.log( 'local offer: ', offerLocal );
		}
	}
)();
