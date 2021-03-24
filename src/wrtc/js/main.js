(
	function () {
		document.getElementById('login-btn').addEventListener( 'click', doLogin );
		document.getElementById('enum-devices-btn').addEventListener( 'click', enumDevices );
		function doLogin() {
			console.log( 'in function doLogin' );
		}
		function enumDevices() {
			console.log( 'in function enumDevices' );
			let devices;
			wrtc_di_enumDevices( devices );
			console.debug( 'enumDevices', devices );
		}
	}
)();
