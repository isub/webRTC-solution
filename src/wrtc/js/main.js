(
	function () {
		document.addEventListener( "DOMContentLoaded", docLoaded );
		document.getElementById( 'login-btn' ).addEventListener( 'click', doLogin );
		document.getElementById( 'settings-btn' ).addEventListener( 'click', openSettings );
		navigator.mediaDevices.addEventListener(
			'devicechange',
			event => {
				makeDeviceList();
			}
		);

		function fillSelect( elementId, devices, deviceType ) {
			let filtered = devices.filter( device => device.kind === deviceType );
			console.debug( 'filter result: ', filtered );
			let selectElement = document.getElementById( elementId );
			filtered.forEach(
				function( item, id, filtered ) {
					let selectOption = document.createElement( 'option' );
					selectOption.value = item.id;
					selectOption.label = item.label;
					selectElement.appendChild( selectOption );
				}
			);
		}
		async function makeDeviceList() {
			let devices = await wrtc_di_enumDevices();
			console.debug( 'wrtc_di_enumDevices() result: ', devices );
			fillSelect( 'audio-device-in', devices, 'audioinput' );
			fillSelect( 'audio-device-out', devices, 'audiooutput' );
			fillSelect( 'video-device-in', devices, 'videoinput' );
		}
		function docLoaded() {
			makeDeviceList();
			makeCall();
		}
		function doLogin() {
			console.log( 'in function doLogin' );
		}
		function openSettings() {
			if( document.getElementById( 'settings' ).style.display === 'none' ) {
				document.getElementById( 'settings' ).style.display = '';
			} else {
				document.getElementById( 'settings' ).style.display = 'none';
			}
		}
		function makeCall() {
			const configuration = { 'iceServers': [ { 'urls': 'turn:sip.dtco.ru' } ] };
			const peerConnection = new RTCPeerConnection( configuration );
			console.log( 'local connection description: ', peerConnection.currentLocalDescription );
		}
	}
)();
