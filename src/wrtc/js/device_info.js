
async function wrtc_di_enumDevices() {
	if( navigator.mediaDevices.enumerateDevices !== 'undefined' ) {
	} else {
		return;
	}
	let regExp = /^[0-9,a-f]+$/i;
	var retVal = [];
	let devices = await navigator.mediaDevices.enumerateDevices();
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
