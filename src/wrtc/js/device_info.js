
function wrtc_di_enumDevices() {
	console.log( 'in function wrtc_di_enumDevices' );
	const constraints = {
		'video': true,
		'audio': true
	}
	navigator.mediaDevices.getUserMedia(constraints)
		.then( stream => {
			console.log( 'Got MediaStream:', stream );
		} )
		.catch( error => {
			console.error( 'Error accessing media devices.', error );
		} );
}