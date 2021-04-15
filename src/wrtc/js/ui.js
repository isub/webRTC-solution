
function fillSelect( elementId, devices, deviceType ) {
	console.debug( `enter ${arguments.callee.name}:`, arguments );
	let filtered = devices.filter( device => device.kind === deviceType );
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
async function wrtcs_ui_init() {
	if( navigator.mediaDevices === undefined ) {
	} else {
		navigator.mediaDevices.addEventListener( 'devicechange', deviceList );
	}
	await deviceList()
	setDefVertoURL()
}
async function deviceList() {
	console.debug( `enter ${arguments.callee.name}:`, arguments )
	let devices = await wrtcs_di_enumDevices()
	console.debug( `${arguments.callee.name}:`, devices )
	fillSelect( 'audio-device-in', devices, 'audioinput' )
	fillSelect( 'audio-device-out', devices, 'audiooutput' )
	fillSelect( 'video-device-in', devices, 'videoinput' )
}
function setDefVertoURL() {
	if( location.protocol === 'https:' ) {
		document.getElementById( 'verto-url' ).value = 'wss:sip.dtco.ru:8082';
	} else {
		document.getElementById( 'verto-url' ).value = 'ws:sip.dtco.ru:8081';
	}
}
function wrtcs_ui_getUserCredentials() {
	return {
		"login": document.getElementById( 'login-login' ).value,
		"passw": document.getElementById( 'login-passw' ).value
	};
}
function wrtcs_ui_getVertoURL() {
	return document.getElementById('verto-url').value
}
function wrtcs_ui_getDialedNumber() {
	return document.getElementById('dialed-number').value
}
