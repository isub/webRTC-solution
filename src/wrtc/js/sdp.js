
async function wrtcs_sdp_getLocalSDP() {
    let iceDone = false, iceTimer = null
    let iceCandidateList = []
    let peerConnection = wrtcs_peer_getPeerConnection()
    let localOffer = await peerConnection.createOffer({'offerToReceiveAudio': true})
    console.debug('makeCall: local offer:', localOffer)
    await peerConnection.setLocalDescription(localOffer)
    peerConnection.onicecandidate = function (event) {
        console.debug('onicecandidate:', event)
        if (iceDone) {
            return
        }
        if (!iceTimer) {
            iceTimer = setTimeout(iceListCompletedCB, 1000)
        }
        if (event) {
            if (event.candidate) {
                iceCandidateList.push(event.candidate)
            }
        } else {
            iceDone = true
            if (iceTimer) {
                clearTimeout(iceTimer)
                iceTimer = null
            }
            return iceListCompletedCB()
        }
    }
    function iceListCompletedCB() {
        console.debug(`enter ${arguments.callee.name}:`, arguments)
        iceDone = true
        iceTimer = null
        console.debug('iceListCompletedCB: candidate list:', iceCandidateList)
        console.debug('iceListCompletedCB: local offer:', peerConnection.localDescription)
        return peerConnection.localDescription
    }
}
