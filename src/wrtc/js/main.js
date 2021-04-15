(
	function () {
		document.addEventListener("DOMContentLoaded", docLoaded);
		document.getElementById('login-btn').addEventListener('click', doLogin);
		document.getElementById('logout-btn').addEventListener('click', doLogout);
		document.getElementById('settings-btn').addEventListener('click', toggleSettings);
		document.getElementById('make-call-btn').addEventListener('click', makeCall);
		window.onbeforeunload = function() {
			wrtcs_ws_close()
		}
		function docLoaded() {
			console.debug(`enter ${arguments.callee.name}:`, arguments)
			wrtcs_ui_init()
		}
		function doLogin() {
			console.debug(`enter ${arguments.callee.name}:`, arguments)
			wrtcs_sig_doLogin( wrtcs_ui_getUserCredentials() )
		}
		function  doLogout() {
			console.debug( `enter ${arguments.callee.name}:`, arguments )
			wrtcs_ws_close()
		}
		function toggleSettings() {
			console.debug(`enter ${arguments.callee.name}:`, arguments);
			if (document.getElementById('settings').style.display === 'none') {
				document.getElementById('settings').style.display = '';
			} else {
				document.getElementById('settings').style.display = 'none';
			}
		}
		async function makeCall() {
			console.debug(`enter ${arguments.callee.name}:`, arguments);
			wrtcs_sig_sendInvite( wrtcs_sdp_getLocalSDP(), wrtcs_ui_getDialedNumber(), didInviteSuccessCB, didInviteFailedCB)
		}
		function didInviteSuccessCB() {
			console.debug(`enter ${arguments.callee.name}:`, arguments);
		}
		function didInviteFailedCB() {
			console.debug(`enter ${arguments.callee.name}:`, arguments);
		}
	}
)();
