import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // if(!socket){
    //   const newSocket = io('http://localhost:8080'); // Replace with your server URL
    //   setSocket(newSocket);
    //   return () => newSocket.close(); // Clean up socket on unmount
    // }

    // if(socket){
    //   console.log("socket connected with server...")
    // }

    const _socket = io("http://localhost:8080");
    // _socket.on("message", onMessageRec);

    setSocket(_socket);

    return () => {
      _socket.disconnect();
      setSocket(undefined);
    };

  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };