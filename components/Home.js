import styles from "../styles/Home.module.css";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import UserNameModal from "./userNameModal";
import { useSelector } from 'react-redux';

function Home() {
  const [chats, setChats] = useState([])
  const [isVisble,  setIsVisible] = useState(true)
  const userName = useSelector((state) => state.userInfos.value.username)

  console.log("USERNAME", userName)

  useEffect(() => {
    const PUSHER_KEY = process.env.REACT_APP_PUSHER_KEY;
    const PUSHER_CLUSTER = process.env.REACT_APP_PUSHER_CLUSTER;
    
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      forceTLS: true,
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", (newMessage) => {
      setChats((prev) => [...prev, newMessage]);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  useEffect(() => {
  
    if(userName){
      setIsVisible(false)
    }
  }, [userName])

  console.log("Visible", isVisble)

  return (
    
      <main className={styles.main}>
        {!userName && <UserNameModal/>}
        <ChatRoom chats = {chats}/>
      </main>

  );
}

export default Home;
