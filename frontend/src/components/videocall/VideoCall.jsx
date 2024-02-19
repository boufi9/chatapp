import React from "react";

const VideoCall = () => {
    // Video call UI
    return (
        <div>
            {/* Local video stream */}
            <video id="localVideo" autoPlay playsInline></video>
            {/* Remote video stream */}
            <video id="remoteVideo" autoPlay playsInline></video>
            {/* Controls (mute, end call, etc.) */}
            {/* Add your controls here */}
        </div>
    );
};

export default VideoCall;
