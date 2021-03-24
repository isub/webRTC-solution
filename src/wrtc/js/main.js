(
	function () {
		document.getElementById('login-btn').addEventListener( 'click', doLogin );
		document.getElementById('enum-devices-btn').addEventListener( 'click', enumDevices );
		function doLogin() {
			console.log( 'in function doLogin' );
		}
		function enumDevices() {
			console.log( 'in function enumDevices' );
			wrtc_di_enumDevices( document.getElementById( 'with-video' ).value );
		}
	}
)();
