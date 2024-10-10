import React, { useState } from 'react';
import './messagebox.css'

const Message = ({ type, message, onClose }) => {
  return (
    <div className={`message-box ${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Message;
