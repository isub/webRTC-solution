
async function wrtc_di_enumDevices() {
	var retVal = [];
	if( navigator.mediaDevices === undefined ) {
		return retVal;
	} else {
	}
	let devices = await navigator.mediaDevices.enumerateDevices();
	let regExp = /^[0-9,a-f]+$/gi;
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
