
function wrtc_di_enumDevices() {
	let regExp = /^[0-9,a-f]+$/i;
	var retVal = [];
	navigator.mediaDevices.enumerateDevices()
		.then(
			function( devices ) {
				console.debug( 'navigator.mediaDevices.enumerateDevices() result: ', devices );
				devices.forEach(
					function( item, ind, devices ) {
						if( regExp.test( item.deviceId ) ) {
							retVal[ ind ] = { 'kind': item.kind, 'id': item.deviceId };
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
	return retVal;
}
