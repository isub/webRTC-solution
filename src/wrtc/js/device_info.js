
async function wrtc_di_enumDevices() {
	var retVal = [];
	if( navigator.mediaDevices === undefined ) {
		return retVal;
	} else {
	}
	let deviceList = await navigator.mediaDevices.enumerateDevices();
	let regExp = /^[0-9,a-f]+$/gi;
	deviceList.forEach(
		function( deviceItem, ind, deviceList ) {
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
