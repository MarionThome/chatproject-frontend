import styles from "../styles/Home.module.css";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import UserNameModal from "./userNameModal";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { resetUsername } from "../reducers/userInfos";
const PUSHER_KEY = process.env.REACT_APP_PUSHER_KEY;
const PUSHER_CLUSTER = process.env.REACT_APP_PUSHER_CLUSTER;

function Home() {
  const dispatch = useDispatch();
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [isVisble, setIsVisible] = useState(true);
  const userName = useSelector((state) => state.userInfos.value.username);

  useEffect(() => {
    const pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      forceTLS: true,
    });

    fetch("https://chatapp-backend-bay.vercel.app/messages", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(res => res.json()).then((data) => {
      if(data.result){
        setChats(
          data.messages.sort((first, sec) => {
            return new Date(sec.date) + new Date(first.date);
          })
        );
      }
    })

    const channel = pusher.subscribe("chat");
    channel.bind("message", (newMessage) => {
      setChats((prev) => [...prev, newMessage]);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  useEffect(() => {
    if (userName) {
      setIsVisible(false);
    }
  }, [userName]);

  return (
    <main className={styles.main}>
      <div className={styles.content}>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          size="2x"
          color="#ddf3f0"
          onClick={() => dispatch(resetUsername())}
        />
      </div>
      {!userName && <UserNameModal />}
      <ChatRoom chats={chats} />
      </div>
    </main>
  );
}

export default Home;
