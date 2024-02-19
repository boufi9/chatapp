// Import necessary hooks and context
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";

const useVideoCall = () => {
    const { authUser } = useAuthContext();
    const { socket } = useSocketContext();
    const [incomingCall, setIncomingCall] = useState(null);

    // Listen for incoming call event
    socket.on("incomingCall", ({ callerId, receiverId }) => {
        if (receiverId === authUser._id) {
            // Set the incoming call details
            setIncomingCall({ callerId, receiverId });
        }
    });

    // Listen for call accepted event
    socket.on("callAccepted", ({ callerId, receiverId }) => {
        if (callerId === authUser._id) {
            // Handle the call accepted event for the current user
            // For example, you can update UI to indicate the call is accepted
        }
    });

    // Function to accept an incoming call
    const acceptCall = () => {
        // Emit event to inform the server that the call is accepted
        socket.emit("acceptCall", {
            callerId: incomingCall.callerId,
            receiverId: authUser._id,
        });

        // Clear the incoming call state
        setIncomingCall(null);
    };

    // Function to reject an incoming call
    const rejectCall = () => {
        // Emit event to inform the server that the call is rejected
        socket.emit("rejectCall", {
            callerId: incomingCall.callerId,
            receiverId: authUser._id,
        });

        // Clear the incoming call state
        setIncomingCall(null);
    };

    return { incomingCall, acceptCall, rejectCall };
};

export default useVideoCall;
