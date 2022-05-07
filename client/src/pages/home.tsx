import { useContext } from "react";

import { ChannelsContext } from "../contexts/channels-context";

import styles from "../styles/pages/home.module.scss";
import Sidebar from "../components/sidebar";
import Chat from "../components/chat";

const Home: React.FC = () => {
  const { currentChannel: [currentChannel] } = useContext(ChannelsContext);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Sidebar />

        {currentChannel._id ? <Chat /> : (
          <div className={styles.welcome}>
            <img src="/welcome.svg" alt="Welcome" />
            <h3>Hello there! It seems you had a very busy day!</h3>
            <p>You can now connect with any user around the world! Just choose any channel or create a new one from the sidebar.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;