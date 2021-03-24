
function wrtc_di_enumDevices() {
	let devices = navigator.mediaDevices.enumerateDevices();
	return devices;
}
