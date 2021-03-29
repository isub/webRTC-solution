
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

function wrtc_ui_onLogin() {
	return {
		'login': document.getElementById( 'login-login' ).textContent,
		'passw': document.getElementById( 'login-passw' ).textContent
	};
}
