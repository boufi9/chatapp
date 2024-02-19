import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io("https://localhost:5000", {
                query: {
                    userId: authUser._id, // Pass the current user's ID as part of the connection query
                },
            });

            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            socket.on("incomingCall", ({ callerId, receiverId }) => {
                if (receiverId === authUser._id) {
                    // Handle the incoming call event for the current user
                }
            });

            socket.on("callAccepted", ({ callerId, receiverId }) => {
                if (callerId === authUser._id) {
                    // Handle the call accepted event for the current user
                }
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
