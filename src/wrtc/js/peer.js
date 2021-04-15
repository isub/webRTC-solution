
let peerConnection

function wrtcs_peer_getPeerConnection() {
    let conf = {
        'iceServers': [{
            'urls': 'turn:sip.dtco.ru',
            'username': 'sip.dtco.ru',
            'credential': 'Gh0uy0pG0u0ls'
        }]
    }
    conf.bundlePolicy = "max-compat"
    peerConnection = new RTCPeerConnection( conf )
    return peerConnection
}
