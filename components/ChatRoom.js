import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/ChatRoom.module.css";

export default function ChatRoom(props) {
  const messages = props.messages
  const chats = props.chats


  const [messageInput, setMessageInput] = useState("");

  const handleMessageInputChange = (event) => {
    setMessageInput(event.target.value);
    
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
      const payload = {
        message: messageInput,
      };
      axios.post("http://localhost:3000/message", payload);
      setMessageInput("");
    }
  }

  const messageList = chats.map((message, index)  => {
    return (
        <div key={index} className={styles.chatMessage}>
          <p className={styles.chatMessageBody}>{message.message}</p>
        </div>
      );
  })

  return (
    <div className={styles.chatRoomWrapper}>
      <div className={styles.chatRoomMessages}>
        {messageList}
      </div>
      <div className={styles.chatRoomMessageInputWrapper}>
        <textarea
          className={styles.chatRoomMessageInput}
          onChange={handleMessageInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Message"
          value={messageInput}
        />
      </div>
    </div>
  );
}


