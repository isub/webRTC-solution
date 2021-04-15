
function fillSelect( elementId, devices, deviceType ) {
	let filtered = devices.filter( device => device.kind === deviceType );
	console.debug( 'filter result:', filtered );
	let selectElement = document.getElementById( elementId );
	selectElement.innerHTML = '';
	filtered.forEach(
		function( item ) {
			let selectOption = document.createElement( 'option' );
			selectOption.value = item.id;
			selectOption.label = item.label;
			selectElement.appendChild( selectOption );
		}
	);
}
function wrtcs_ui_init() {
	if( navigator.mediaDevices === undefined ) {
	} else {
		navigator.mediaDevices.addEventListener( 'devicechange', wrtcs_ui_deviceList );
	}
}
async function wrtcs_ui_deviceList() {
	console.debug( `enter ${arguments.callee.name}:`, arguments );
	let devices = await wrtcs_di_enumDevices();
	console.debug( `${arguments.callee.name}:`, devices );
	fillSelect( 'audio-device-in', devices, 'audioinput' );
	fillSelect( 'audio-device-out', devices, 'audiooutput' );
	fillSelect( 'video-device-in', devices, 'videoinput' );
}
function wrtcs_ui_vertoURL() {
	if( location.protocol === 'https:' ) {
		document.getElementById( 'verto-url' ).value = 'wss:sip.dtco.ru:8082';
	} else {
		document.getElementById( 'verto-url' ).value = 'ws:sip.dtco.ru:8081';
	}
}
function wrtcs_ui_onLogin() {
	console.debug( 'in function wrtcs_ui_onLogin:', document.getElementById( 'login-login' ).value );
	console.debug( 'in function wrtcs_ui_onLogin:', document.getElementById( 'login-passw' ).value );
	return {
		'login': document.getElementById( 'login-login' ).value,
		'passw': document.getElementById( 'login-passw' ).value
	};
}
