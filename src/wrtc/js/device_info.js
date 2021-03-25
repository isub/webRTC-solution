
function wrtc_di_enumDevices() {
	let regExp = /[0-9,a-f]/i;
	var retVal = [];
	let devices = navigator.mediaDevices.enumerateDevices();
	console.debug( 'wrtc_di_enumDevices', devices );
	devices.forEach(
		function( item, ind, devices ) {
			if( regExp.test( item.deviceId ) ) {
				retVal[ ind ].kind = item.kind;
				retVal[ ind ].deviceId = item.deviceId;
			}
		}
	);
	return retVal;
}
