
import { useEffect } from "react";
import { useSelector } from "react-redux";



const useSocket = (event, handler) => {
    const { socket } = useSelector((state) => state.socket);
    useEffect(() => {
      socket.on(event, handler);
  
      return () => {
        socket.off(event, handler);
      };
    }, [socket, event, handler]);
  };
  

  
  
  export default useSocket;
  