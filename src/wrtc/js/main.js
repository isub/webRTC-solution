(
	function () {
		document.addEventListener("DOMContentLoaded", docLoaded);
		document.getElementById('login-btn').addEventListener('click', wrtcs_doLogin);
		document.getElementById('logout-btn').addEventListener('click', wrtcs_doLogout);
		document.getElementById('make-call-btn').addEventListener('click', wrtcs_makeCall);
		document.getElementById('settings-btn').addEventListener('click', toggleSettings);
		window.onbeforeunload = function() {
			wrtcs_ws_close()
		}
		function docLoaded() {
			console.debug(`enter ${arguments.callee.name}:`, arguments)
			wrtcs_ui_init();
		}
		function toggleSettings() {
			console.debug(`enter ${arguments.callee.name}:`, arguments);
			if (document.getElementById('settings').style.display === 'none') {
				document.getElementById('settings').style.display = '';
			} else {
				document.getElementById('settings').style.display = 'none';
			}
		}
		function didInviteSuccessCB() {
			console.debug(`enter ${arguments.callee.name}:`, arguments);
		}
		function didInviteFailedCB() {
			console.debug(`enter ${arguments.callee.name}:`, arguments);
		}
	}
)();
