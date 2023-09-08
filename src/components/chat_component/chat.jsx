import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChat, fetchMessage } from "../../redux/chatReducer";

export default function Chat({ chat, close }) {
    const dispatch = useDispatch();
    const allMessage = useSelector(state => state.chat.chat);
    const [newMessage, setNewMessage] = useState("");
    const {socket} = useSelector(state => state.socket)

    socket.on('refresh-chat', (room) => {
        dispatch(fetchChat(room))
    })

    const handleSendMessage = async () => {
        await dispatch(fetchMessage({ message: newMessage, id_room: chat.id_room }));
        setNewMessage("");
    };

    return (
        <div>
            <button onClick={() => close(null)}>Close</button>
            <h1>{chat.title}</h1>
            <div className="p-5">
                {allMessage && allMessage.map((message, index) => (
                <div key={index}>
                    <p className={message.isMine ? 'text-end' : ''}>{message.message}</p>
                </div>
            ))}
            </div>
            
            <div className="sender">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Invia</button>
            </div>
        </div>
    );
}
