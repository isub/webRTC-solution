(
	function () {
		document.getElementById('login-btn').addEventListener( 'click', doLogin );
		document.getElementById('enum-devices-btn').addEventListener( 'click', enumDevices );
	}
	function doLogin() {
	}
	function enumDevices() {
		wrtc_di_enumDevices( document.getElementById( 'with-video' ).value );
	}
)();
