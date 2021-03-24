
function wrtc_di_enumDevices( withVideo ) {
	try {
		let constraints = { 'video': true, 'audio': true };
		if( ! withVideo ) {
			constraints = { 'video': false, 'audio': true };
		}
		const stream = openMediaDevices(  );
		console.log( 'Got MediaStream:', stream );
	} catch( error ) {
		console.error( 'Error accessing media devices.', error );
	}
}
const openMediaDevices = async( constraints ) => {
	return await navigator.mediaDevices.getUserMedia( constraints );
}
