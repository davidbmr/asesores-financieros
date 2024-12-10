import React, { useState, useEffect } from 'react';
import style from './ChatWindow.module.css';
import { FaTimes, FaUser, FaUserTie } from 'react-icons/fa';
import api from '@/connections';
import { usePostFetch } from '@/hooks/usePostFetch';

const ChatWindow = ({ isOpen, onClose, chatId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { postFetchData } = usePostFetch('chats/createMessage', {
    sectionName: 'Mensaje',
    showToast: false,
  });

  const fetchMessages = async () => {
    if (!chatId) return;
    try {
      const response = await api.get(`chats/messages/${chatId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
      const interval = chatId ? setInterval(fetchMessages, 2000) : null;
      return () => interval && clearInterval(interval);
    }
  }, [isOpen, chatId]);

  const handleSendMessage = async () => {
    if (!chatId) return;
    if (newMessage.trim()) {
      try {
        await postFetchData({ chatId, text: newMessage });
        setNewMessage('');
        fetchMessages();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    isOpen && (
      <div className={style.chatWindow}>
        <div className={style.chatHeader}>
          <h4>Chat</h4>
          <button className={style.closeButton} onClick={onClose}>
            <FaTimes size={20} />
          </button>
        </div>
        <div className={style.chatMessages} style={chatId ? {} : { justifyContent: 'center', alignItems: 'center' }}>
          {chatId ? (
            messages.map((msg) => (
              <div key={msg._id} className={`${style.messageContainer} ${msg.user_role === 'CLIENTE' ? style.clientContainer : style.contadoraContainer}`}>
                <div className={style.userDetails}  style={{
                    flexDirection: msg.user_role === 'CLIENTE' ? 'row' : 'row-reverse',
                    marginRight: msg.user_role === 'CLIENTE' ? '15px' : '',
                  }}>
                  <span className={style.icon} style={{
                    marginRight: msg.user_role === 'CLIENTE' ? '10px' : '',
                    marginLeft: msg.user_role === 'CONTADORA' ? '10px' : '',
                  }}>
                    {msg.user_role === 'CLIENTE' ? <FaUser /> : <FaUserTie />}
                  </span>
                  <div>
                    <strong>{msg.user_name ? msg.user_name : 'Usuario'}</strong>
                    <br />
                    <span className={style.role}>
                      {msg.user_role}
                    </span>
                  </div>
                </div>
                <div className={`${style.message} ${msg.user_role === 'CLIENTE' ? style.client : style.contadora}`}>
                  {msg.message}
                </div>
              </div>
            ))
          ) : (
            <div className={style.noChatMessage}>
              <p>No se ha asignado un ID de chat. Por favor, contacte al administrador.</p>
            </div>
          )}
        </div>
        {chatId && (
          <div className={style.chatInput}>
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
        )}
      </div>
    )
  );
};

export default ChatWindow;
