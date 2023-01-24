import styles from "../styles/Home.module.css";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";

function Home() {
  const [messages, setMessages] = useState();
  const [chats, setChats] = useState([])


  useEffect(() => {
    const PUSHER_KEY = process.env.REACT_APP_PUSHER_KEY;
    const PUSHER_CLUSTER = process.env.REACT_APP_PUSHER_CLUSTER;
    
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      forceTLS: true,
    });

    console.log(messages);
    const channel = pusher.subscribe("chat");
    channel.bind("message", (newMessage) => {
      setMessages(newMessage);
    });
  }, []);

  useEffect(() => {
    if(messages){
      setChats([...chats, messages])
    }
  }, [messages])

  return (
    <div>
      <main className={styles.main}>
        <ChatRoom messages={messages} chats = {chats} />
      </main>
    </div>
  );
}

export default Home;
