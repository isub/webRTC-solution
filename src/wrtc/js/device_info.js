
function wrtc_di_enumDevices() {
	const openMediaDevices = async( constraints ) => {
		return await navigator.mediaDevices.getUserMedia( constraints );
	}

	try {
		const stream = openMediaDevices( { 'video':true, 'audio':true } );
		console.log( 'Got MediaStream:', stream );
		$( '#debug-text-box' ).val( 'Got MediaStream: ' + stream );
	} catch( error ) {
		console.error( 'Error accessing media devices.', error );
	}
}
