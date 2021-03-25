
function wrtc_di_enumDevices() {
	let regExp = /[0-9,a-f]/i;
	var retVal = [];
	navigator.mediaDevices.enumerateDevices()
		.then(
			function( devices ) {
				devices.forEach(
					function( item, ind, devices ) {
						if( regExp.test( item.deviceId ) ) {
							retVal[ ind ] = { item.kind, item.deviceId };
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
