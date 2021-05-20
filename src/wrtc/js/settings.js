
let isUsingAudio = true;
let isUsingVideo = true;

let audioInputDeviceId = 'default';
let audioOutputDeviceId = 'default';
let videoInputDeviceId = 'default';

function  wrtcs_isUsingMediaType( mediaType ) {
    switch( mediaType ) {
        case 'audio':
            return isUsingAudio;
        case 'video':
            return isUsingVideo;
    }
}
function wrtcs_setDeviceId( deviceType, deviceId ) {
    switch ( deviceType ) {
        case 'audioinput' :
            audioInputDeviceId = deviceId
            break
        case 'audiooutput' :
            audioOutputDeviceId = deviceId
            break
        case 'videoinput' :
            videoInputDeviceId = deviceId
            break
    }
}
function wrtcs_getDeviceId( deviceType ) {
    switch ( deviceType ) {
        case 'audioinput' :
            return audioInputDeviceId
        case 'audiooutput' :
            return audioOutputDeviceId
        case 'videoinput' :
            return videoInputDeviceId
    }
}
