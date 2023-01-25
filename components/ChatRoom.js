import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "../styles/ChatRoom.module.css";
import moment from "moment";

export default function ChatRoom(props) {
  const chats = props.chats
  const userName = useSelector((state) => state.userInfos.value.username)
  const date = new Date()


  const [messageInput, setMessageInput] = useState("");

  const handleMessageInputChange = (event) => {
    setMessageInput(event.target.value);
    
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
      const payload = {
        author : userName,
        message: messageInput,
        date : date, 
      };
      axios.post("http://localhost:3000/message", payload);
      setMessageInput("");
    }
  }

  const messageList = chats.map((message, index)  => {
    return (
        <div key={index} className={styles.chatMessage}>
          <p>{message.author}</p>
          <div>
            <p className={styles.chatMessageBody}>{message.message}</p>
          </div>
          <div>
            <p>{moment(message.date).calendar()}</p>
          </div>
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


