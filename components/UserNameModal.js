import React, { useState } from "react";
import styles from "../styles/UserName.module.css";
import { useDispatch } from "react-redux";
import { addUsername } from "../reducers/userInfos";
import axios from "axios";

export default function UserNameModal(props) {
  const [userNameInput, setUserNameInput] = useState("");
  const dispatch = useDispatch();

  const handleMessageInputChange = (event) => {
    setUserNameInput(event.target.value);
  };


  const handleKeyPress = (event) => {
    if ((event.key === "Enter" || event.keyCode === 13) && userNameInput) {
      fetch("https://chatapp-backend-bay.vercel.app/users/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userNameInput }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(addUsername(userNameInput));
          setUserNameInput("");
          if (data.result) {
            axios.post("https://chatapp-backend-bay.vercel.app/message", {
              author: "Marion",
              message: `Welcome ${userNameInput}, to start chatting, just write your message and press "enter" :)`,
              date: new Date(),
            });
          }
        });
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        <h1 className={styles.title}>Welcome</h1>
        <h2 className={styles.title2}>
          Please enter a username and press enter to start chatting
        </h2>
        <input
          placeholder="username"
          type="text"
          className={styles.userNameInput}
          onChange={handleMessageInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}
