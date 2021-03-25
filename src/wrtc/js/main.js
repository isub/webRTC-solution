(
	function () {
		document.getElementById( 'login-btn' ).addEventListener( 'click', doLogin );
		document.getElementById( 'settings-btn' ).addEventListener( 'click', openSettings );
		function doLogin() {
			console.log( 'in function doLogin' );
		}
		function openSettings() {
			if( document.getElementById( 'settings' ).style.display === 'none' ) {
				document.getElementById( 'settings' ).style.display === '';
			} else {
				document.getElementById( 'settings' ).style.display === 'none';
			}
		}
	}
)();
