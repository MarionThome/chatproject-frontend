import React, { useState } from "react";
import styles from "../styles/UserName.module.css";
import { useDispatch } from 'react-redux';
import { addUsername } from '../reducers/userInfos';

export default function UserNameModal(props) {
  const [userNameInput, setUserNameInput] = useState("");
  const dispatch  = useDispatch()

  const handleMessageInputChange = (event) => {
    setUserNameInput(event.target.value);
  };

  console.log(userNameInput)

  const handleKeyPress = (event) => {
    if ((event.key === "Enter" || event.keyCode === 13) && userNameInput) {
      dispatch(addUsername(userNameInput))  
      setUserNameInput("");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        <h1>Please enter your UserName</h1>
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
