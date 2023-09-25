import React, { useEffect, useRef, useState } from "react";
import { MessageList } from "react-chat-elements";
import 'react-chat-elements/dist/main.css';
import { IoChevronBack } from 'react-icons/io5';
import { useDispatch, useSelector } from "react-redux";
import useSocket from "../../Hooks/useSocket";
import { fetchChat, fetchMessage, fetchReadMessage } from "../../redux/chatReducer";
import { sendNewMessage } from "../../redux/socketReducer";
import { setChat } from "../../redux/chatReducer";
import { Link } from "react-router-dom";


export default function Chat({ chat, close, handleCloseOffcanvas }) {
    const dispatch = useDispatch();
    const allMessage = useSelector(state => state.chat.chat);
    const [newMessage, setNewMessage] = useState("");
    const messageEndRef = useRef(null);

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


    useSocket('refresh-chat', async (room) => {
        await dispatch(fetchReadMessage(room))
        await dispatch(fetchChat(room));
        await dispatch(sendNewMessage())
        scrollToBottom();
    })

    const handleClose = () => {
        dispatch(setChat([]))
        close(null);
    }

    
    return (
        <div className="d-flex flex-column justify-content-start h-100">
            <div className="d-flex align-items-center justify-content-start ps-4 shadow pb-3 pt-3">
                <p onClick={handleClose}><IoChevronBack size={30} style={{ cursor: 'pointer' }} /></p>
                <h3 className="ps-4">{chat.title}</h3>
            </div>
            <div id="message-list" className="p-2">
                <MessageList
                    className='message-list'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={allMessage.map((message, index) => {
                        if (index === 0) {
                            if (message.isMine) {
                                return {
                                    type: 'system',
                                    text: "Hai creato l'evento",
                                }
                            } else {
                                return {
                                    type: 'system',
                                    text: message.message,
                                }
                            }
                        } else if (message.isJoinMessage) {
                            if (message.isMine) {
                                return {
                                    type: 'system',
                                    text: "Ti sei unito all'evento",
                                }
                            } else {
                                return {
                                    type: 'system',
                                    text: message.message,
                                }
                            }

                        } else {
                            return {
                                position: message.isMine ? 'right' : 'left',
                                type: 'text',
                                text: message.message,
                                date: new Date(message.createdAt),
                                title: (
                                    message.isMine ? message.sender.username :
                                    <Link to={`/profile/${message.sender._id}`} onClick={handleCloseOffcanvas}>
                                        {message.sender.username}
                                    </Link>
                                ),
                                avatar: message.sender.avatar,
                            }
                        }

                    })}
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
