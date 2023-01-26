import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "../styles/ChatRoom.module.css";
import moment from "moment";

export default function ChatRoom(props) {
  const chats = props.chats;
  const userName = useSelector((state) => state.userInfos.value.username);
  const date = new Date();

  const [messageInput, setMessageInput] = useState("");

  const handleMessageInputChange = (event) => {
    setMessageInput(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
      const payload = {
        author: userName,
        message: messageInput,
        date: date,
      };
      axios.post("https://chatapp-backend-h3t2.onrender.com/message", payload);
      setMessageInput("");
    }
  };

  const messageList = chats.map((message, index) => {
    if (message.author === userName) {
      return (
        <div
          key={index}
          className={styles.chatMessage}
          style={{ alignItems: "flex-end" }}
        >
          <p className= {styles.messageAuthor}>{message.author}</p>

          <p
            className={styles.chatMessageBody}
            style={{ backgroundColor: "#77c7c5" }}
          >
            {message.message}
          </p>

          <p className= {styles.messageDate}>{moment(message.date).calendar()}</p>
        </div>
      );
    } else {
      return (
        <div key={index} className={styles.chatMessage}>
          <p className= {styles.messageAuthor}>{message.author}</p>
          <div>
            <p
              className={styles.chatMessageBody}
              style={{ backgroundColor: "#a9b5b7" }}
            >
              {message.message}
            </p>
          </div>
          <div>
            <p className= {styles.messageDate}>{moment(message.date).calendar()}</p>
          </div>
        </div>
      );
    }
  });

  return (
    <div className={styles.chatRoomWrapper}>
      <div className={styles.chatsContainer} id="scroll">
        <div className={styles.chatRoomMessages}>{messageList}</div>
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
