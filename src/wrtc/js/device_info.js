
function wrtc_di_enumDevices() {
	let regExp = /^[0-9,a-f]+$/i;
	var retVal = [];
	return navigator.mediaDevices.enumerateDevices()
		.then(
			function( devices ) {
				console.debug( 'navigator.mediaDevices.enumerateDevices() result: ', devices );
				return devices.map(
					function( item, ind, devices ) {
						if( regExp.test( item.deviceId ) ) {
							return ( { kind: item.kind, id: item.deviceId, label: item.label } );
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
