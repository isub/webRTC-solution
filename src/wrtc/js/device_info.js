
async function wrtcs_di_enumDevices() {
	let retVal = [];
	if( navigator.mediaDevices === undefined ) {
		return retVal;
	} else {
	}
	try {
		await navigator.mediaDevices.getUserMedia( { audio: true, video: false } );
	} catch( err ) {
		isUsingAudio = false;
	}
	try {
		await navigator.mediaDevices.getUserMedia( { audio: false, video: true } );
	} catch( err ) {
		isUsingVideo = false;
	}
	let deviceList = await navigator.mediaDevices.enumerateDevices();
	console.debug( 'full device list:', deviceList );
	deviceList.forEach(
		function( deviceItem ) {
			retVal.push(
				{
					kind: deviceItem.kind,
					id: deviceItem.deviceId,
					label: deviceItem.label
				}
			);
		}
	);
	return retVal;
}
