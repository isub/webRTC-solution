
function wrtc_di_enumDevices() {
	let devices = navigator.mediaDevices.enumerateDevices();
	console.debug( 'wrtc_di_enumDevices', devices );
	return devices;
}
