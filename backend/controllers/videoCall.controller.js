// backend/controllers/videoCall.controller.js

import { getReceiverSocketId, io } from "../socket/socket.js";

export const callUser = (req, res) => {
    try {
        const { callerId, receiverId, signal } = req.body;

        // Send call request to receiver
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("incomingCall", { callerId, signal });
        }

        res.status(200).send("Call request sent successfully");
    } catch (error) {
        console.error("Error in callUser controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const answerCall = (req, res) => {
    try {
        const { receiverId, signal } = req.body;

        // Send call acceptance to caller
        const callerSocketId = getReceiverSocketId(receiverId);
        if (callerSocketId) {
            io.to(callerSocketId).emit("callAccepted", signal);
        }

        res.status(200).send("Call accepted successfully");
    } catch (error) {
        console.error("Error in answerCall controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
