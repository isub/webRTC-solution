
function wrtc_di_enumDevices() {
	let regExp = /^[0-9,a-f]+$/i;
	var retVal = [];
	navigator.mediaDevices.enumerateDevices()
		.then(
			function( devices ) {
				let arrInd = 0;
				console.debug( 'navigator.mediaDevices.enumerateDevices() result: ', devices );
				devices.forEach(
					function( item, ind, devices ) {
						if( regExp.test( item.deviceId ) ) {
							retVal[ arrInd ++ ] = {
								kind: item.kind,
								id: item.deviceId,
								label: item.label
							};
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
