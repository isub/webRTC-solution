
async function wrtc_di_enumDevices() {
	var retVal = [];
	if( navigator.mediaDevices === undefined ) {
		return retVal;
	} else {
	}
	let deviceList = await navigator.mediaDevices.enumerateDevices();
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
