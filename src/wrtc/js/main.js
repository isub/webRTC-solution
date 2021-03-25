(
	function () {
		document.addEventListener( "DOMContentLoaded", docLoaded );
		document.getElementById( 'login-btn' ).addEventListener( 'click', doLogin );
		document.getElementById( 'settings-btn' ).addEventListener( 'click', openSettings );
		function fillSelect( elementId, devices, deviceType ) {
			let filtered = devices.filter( device => device.kind === deviceType );
			console.debug( 'filter result: ', filtered );
			let txtHTML;
			filtered.forEarch(
				function( item, id, filtered ) {
					txtHTML += '<option>' + item.label + '</option>';
				}
			);
			document.getElementById( elementId ).innerHTML = txtHTML;
		}
		function docLoaded() {
			let devices = wrtc_di_enumDevices();
			console.debug( 'wrtc_di_enumDevices() result: ', devices );
			fillSelect( 'settings-btn', devices, 'audioinput' );
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
