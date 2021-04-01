
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
async function wrtc_ui_deviceList() {
	let devices = await wrtc_di_enumDevices();
	console.debug( 'wrtc_di_enumDevices() result: ', devices );
	fillSelect( 'audio-device-in', devices, 'audioinput' );
	fillSelect( 'audio-device-out', devices, 'audiooutput' );
	fillSelect( 'video-device-in', devices, 'videoinput' );
}
function wrtc_ui_vertoURL() {
	if( location.protocol === 'https' ) {
		document.getElementById( 'verto-url' ).value = 'wss:sip.dtco.ru:8082';
	} else {
		document.getElementById( 'verto-url' ).value = 'ws:sip.dtco.ru:8081';
	}
}
function wrtc_ui_onLogin() {
	console.debug( 'in function wrtc_ui_onLogin: ', document.getElementById( 'login-login' ).value );
	console.debug( 'in function wrtc_ui_onLogin: ', document.getElementById( 'login-passw' ).value );
	return {
		'login': document.getElementById( 'login-login' ).value,
		'passw': document.getElementById( 'login-passw' ).value
	};
}
