
function wrtcs_doLogin() {
    console.debug(`enter ${arguments.callee.name}:`, arguments)
    wrtcs_sig_doLogin( wrtcs_ui_getUserCredentials() )
}
function wrtcs_doLogout() {
    console.debug( `enter ${arguments.callee.name}:`, arguments )
    wrtcs_ws_close()
}
function wrtcs_makeCall() {
    console.debug(`enter ${arguments.callee.name}:`, arguments);
    wrtcs_sig_sendInvite( wrtcs_sdp_getLocalSDP(), wrtcs_ui_getDialedNumber(), didInviteSuccessCB, didInviteFailedCB)
}
