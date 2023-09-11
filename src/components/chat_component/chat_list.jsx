import { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { AiOutlineWechat } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChat, fetchReadMessage } from '../../redux/chatReducer';
import { fetchOnLoadEvent } from '../../redux/eventReducer';
import Chat from './chat';
import './style.css';
import useSocket from '../../Hooks/useSocket';


export default function ChatList() {
  const [show, setShow] = useState(false);
  const [chatSelected, setChatSelected] = useState(null);
  const listChat = useSelector(state => state.event.eventPlayer);
  const dispatch = useDispatch()

  useSocket('refresh-message', async () => {
    await dispatch(fetchOnLoadEvent())
  })

  useEffect(() => {
    dispatch(fetchOnLoadEvent())
  }, [])

  const handleClose = () => {
    setShow(false);
    setChatSelected(null);
  }
  const handleShow = () => setShow(true);

  const handleSelectChat = (chat) => {
    setChatSelected(chat);
    dispatch(fetchChat(chat.id_room))
    dispatch(fetchReadMessage(chat.id_room))
  }

  return (
    <>
      <AiOutlineWechat onClick={handleShow} size={40} style={{cursor: 'pointer'}} />

      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header >
          <Offcanvas.Title>Chat for events</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body >
          {chatSelected && <Chat chat={chatSelected} close={setChatSelected} />}
          {!chatSelected && listChat && listChat.map((chat, index) => (
            <div key={index} className='chat-item' onClick={() => handleSelectChat(chat)}>
              <Image src={chat.location.cover} roundedCircle width={50} height={50}c className='shadow' />
              <div className='ms-3'>
                <p>{chat.title}</p>
                <p className='text-muted'>{chat.description}</p>
              </div>
              {chat.howChatNotRead !== 0 && <div id='notReadChat' className='active me-5'>{chat.howChatNotRead}</div>}
            </div>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

