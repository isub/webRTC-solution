
function wrtc_di_enumDevices() {
	let regExp = /^[0-9,a-f]+$/i;
	var retVal = [];
	return navigator.mediaDevices.enumerateDevices()
		.then(
			function( devices ) {
				console.debug( 'navigator.mediaDevices.enumerateDevices() result: ', devices );
				return devices.filter(
					function( item, ind, devices ) {
						if( regExp.test( item.deviceId ) ) {
							return true;
						}
					}
				);
			}
		)
		.catch(
			function( error ) {
				console.log( 'navigator.mediaDevices.enumerateDevices failed: ' + error );
			}
		);
}
