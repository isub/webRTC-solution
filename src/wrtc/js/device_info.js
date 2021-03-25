
function wrtc_di_enumDevices() {
	let devices = navigator.mediaDevices.enumerateDevices();
	console.debug( 'wrtc_di_enumDevices', devices );
	let regExp = /[0-9,a-f]/i;
	var retVal = [];
	devices.forEach( item, ind, devices ) {
		if( regExp.test( item.deviceId ) {
			retVal[ ind ].kind = item.kind;
			retVal[ ind ].deviceId = item.deviceId;
		}
	}
	return retVal;
}
