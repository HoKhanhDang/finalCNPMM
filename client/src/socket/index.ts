import { Socket, io } from "socket.io-client";

class SocketSingleton {
    private static instance: Socket;
    private constructor() {}
    public static getInstance(): Socket {
        if (!SocketSingleton.instance) {
            SocketSingleton.instance = io("http://localhost:5001",{
                autoConnect: false,
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: 3,
                transports: ["websocket"],
            });
            // SocketSingleton.instance = io("http://54.255.249.65:5001",{
            //     autoConnect: false,
            //     reconnection: true,
            //     reconnectionDelay: 1000,
            //     reconnectionDelayMax: 5000,
            //     reconnectionAttempts: 3,
            //     transports: ["websocket"],
            // });
        
        }
        return SocketSingleton.instance;
    }
}
export default SocketSingleton;