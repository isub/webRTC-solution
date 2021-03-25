
async function wrtc_di_enumDevices() {
	let regExp = /^[0-9,a-f]+$/i;
	var retVal = [];
	let devices = await navigator.mediaDevices.enumerateDevices();
	if( devices.length() > 0 ) {
	} else {
		devices = await navigator.enumerateDevices();
		if( devices.length() > 0 ) {
		} else {
			return retVal;
		}
	}
	devices.forEach(
		function( item, ind, devices ) {
			if( regExp.test( item.deviceId ) ) {
				retVal.push(
					{
						kind: item.kind,
						id: item.deviceId,
						label: item.label
					}
				);
			}
		}
	);
	return retVal;
}
