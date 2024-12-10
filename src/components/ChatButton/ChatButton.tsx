import React from 'react';
import { FaComments } from 'react-icons/fa';
import style from './ChatButton.module.css';

const ChatButton = ({ onClick }) => {
  return (
    <button className={style.chatButton} onClick={onClick}>
      <FaComments size={24} />
    </button>
  );
};

export default ChatButton;
