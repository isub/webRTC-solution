var isUsingAudio = true;
var isUsingVideo = true;

async function wrtc_di_enumDevices() {
	let retVal = [];
	if( navigator.mediaDevices === undefined ) {
		return retVal;
	} else {
	}
	try {
		await navigator.mediaDevices.getUserMedia( { audio: isUsingAudio, video: isUsingVideo } );   
	} cathc( err ) {
		isUsingAudio = false;
	}
	try {
		await navigator.mediaDevices.getUserMedia( { audio: false, video: true } );   
	} cathc( err ) {
		isUsingVideo = false;
	}
	let deviceList = await navigator.mediaDevices.enumerateDevices();
	let regExp = /^[0-9,a-f]+$/gi;
	deviceList.forEach(
		function( deviceItem ) {
			if( regExp.test( deviceItem.deviceId ) ) {
				retVal.push(
					{
						kind: deviceItem.kind,
						id: deviceItem.deviceId,
						label: deviceItem.label
					}
				);
			}
		}
	);
	return retVal;
}
