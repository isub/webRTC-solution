(
	function () {
		document.addEventListener( "DOMContentLoaded", docLoaded );
		document.getElementById( 'login-btn' ).addEventListener( 'click', doLogin );
		document.getElementById( 'settings-btn' ).addEventListener( 'click', openSettings );
		function docLoaded() {
			let devices = wrtc_di_enumDevices();
			console.debug( 'wrtc_di_enumDevices() result: ', devices );
			let filtered = devices.filter(
				function( item, index, array ) {
					if( item.kind === 'audioinput' ) {
						return true;
					} else {
						return false;
					}
				}
			);
			console.debug( 'filter result: ', filtered );
			let txtHTML;
			filtered.forEarch(
				function( item, id, filtered ) {
					txtHTML += '<option>' + item.label + '</option>';
				}
			);
			document.getElementById( 'settings-btn' ).innerHTML = txtHTML;
		}
		function doLogin() {
			console.log( 'in function doLogin' );
		}
		function openSettings() {
			if( document.getElementById( 'settings' ).style.display === 'none' ) {
				document.getElementById( 'settings' ).style.display = '';
			} else {
				document.getElementById( 'settings' ).style.display = 'none';
			}
		}
	}
)();
