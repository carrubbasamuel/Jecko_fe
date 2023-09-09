import React, { useEffect, useRef, useState } from "react";
import { MessageList } from "react-chat-elements";
import 'react-chat-elements/dist/main.css';
import { IoChevronBack } from 'react-icons/io5';
import { useDispatch, useSelector } from "react-redux";
import { fetchChat, fetchMessage } from "../../redux/chatReducer";

export default function Chat({ chat, close }) {
    const dispatch = useDispatch();
    const allMessage = useSelector(state => state.chat.chat);
    const [newMessage, setNewMessage] = useState("");
    const { socket } = useSelector(state => state.socket);
    const messageEndRef = useRef(null);

    useEffect(() => {
        socket.on('refresh-chat', (room) => {
            dispatch(fetchChat(room));
            scrollToBottom();
        });

        return () => {
            socket.off('refresh-chat');
        };
    }, [dispatch, socket]);

    useEffect(() => {
        scrollToBottom();
    }, [allMessage]);

    const scrollToBottom = () => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const handleSendMessage = async () => {
        await dispatch(fetchMessage({ message: newMessage, id_room: chat.id_room }));
        setNewMessage("");
    };

    return (
        <div className="d-flex flex-column justify-content-start h-100">
            <div className="d-flex align-items-center justify-content-start ps-4 shadow pb-3">
                <p onClick={() => close(null)}><IoChevronBack size={30} style={{cursor: 'pointer'}}/></p>
               <h3 className="ps-4">{chat.title}</h3>
            </div>
            <div id="message-list" className="p-2">
                <MessageList
                    className='message-list'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={allMessage.map((message, index) => ({
                        position: message.isMine ? 'right' : 'left',
                        type: 'text',
                        text: message.message,
                        date: new Date(message.date),
                        title: message.sender.username,
                        avatar: message.sender.avatar,
                    }))}
                />
                <div ref={messageEndRef}></div> 
            </div>

            <div className="sender">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.shiftKey && e.charCode === 13) {
                            return true;
                        }
                        if (e.charCode === 13) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                />
                <button onClick={handleSendMessage}>Invia</button>
            </div>
        </div>
    );
}
