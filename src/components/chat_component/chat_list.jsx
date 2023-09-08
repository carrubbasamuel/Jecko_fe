import { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { AiOutlineWechat } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOnLoadEvent } from '../../redux/eventReducer';
import Chat from './chat';
import { fetchChat } from '../../redux/chatReducer';

function Example() {
  const [show, setShow] = useState(false);
  const [chatSelected, setChatSelected] = useState(null);
  const listChat = useSelector(state => state.event.eventPlayer);
  const dispatch = useDispatch()


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
  }

  return (
    <>
      <AiOutlineWechat onClick={handleShow} size={40} />

      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Chat</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {chatSelected && <Chat chat={chatSelected} close={setChatSelected} />}
          {!chatSelected && listChat && listChat.map((chat, index) => (
            <div key={index} className='chat-item' onClick={()=>handleSelectChat(chat)}>
                <p>{chat.title}</p>
                <p>{chat.description}</p>
            </div>
            ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Example;