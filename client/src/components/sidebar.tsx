import { useContext, useState } from "react";
import { GoPlus } from "react-icons/go";
import { RiLogoutCircleLine } from "react-icons/ri";

import { UsersContext, userInitialState } from "../contexts/users-context";
import { ChannelsContext } from "../contexts/channels-context";
import handlers from "../utils/handlers";
import type { ChannelFormDataInterface as FormData, ChannelInterface } from "../interfaces/channels-interfaces";

import styles from "../styles/components/sidebar.module.scss";
import helpers from "../utils/helpers";
import socket from "../services/socket";

const formDataInitialState: FormData = {
  name: "",
  type: ""
};

const Sidebar: React.FC = () => {
  const { token: [token, setToken], user: [, setUser] } = useContext(UsersContext);
  const { callback: [callback, setCallback], currentChannel: [currentChannel, setCurrentChannel], publicChannels } = useContext(ChannelsContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(formDataInitialState);

  const handleJoinChannel = (channel: ChannelInterface) => {
    if (currentChannel === channel) return;
    setCurrentChannel(channel);
    socket.emit("join_channel", channel._id);
  }

  const handleNewForm = (type: string) => {
    setIsModalOpen(true);
    setFormData({ name: "", type });
  }

  const handleFormReset = () => {
    setIsModalOpen(false);
    setFormData(formDataInitialState);
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { default: channelsService } = await import("../services/channels-service");
      const { data } = await channelsService.createChannel(token, formData);
      setCallback(!callback);
      setCurrentChannel(data);
      setIsModalOpen(false);
      setFormData(formDataInitialState);
    } catch (error: any) {
      return alert(error);
    }
  }

  const handleLogout = async () => {
    try {
      const { default: authService } = await import("../services/auth-service");
      await authService.logout();
      setToken("");
      setUser(userInitialState);
      setCurrentChannel({} as ChannelInterface);
      localStorage.removeItem("authenticated");
    } catch (error: any) {
      return alert(error);
    }
  }

  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.top_section}>
          <div className={styles.logo}>
            <img src="/logo.svg" alt="Logo" />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.channels}>
            <div className={styles.type}>
              <h3>Public channels ({publicChannels.length}/5)</h3>
              <div className={styles.button} onClick={() => handleNewForm("public")}>
                <GoPlus />
              </div>
            </div>

            {!publicChannels.length ? (
              <div className={styles.channel} onClick={() => handleNewForm("public")}>
                <div className={styles.hashtag} />
                <h3>create-channel</h3>
              </div>
            ) : null}

            {publicChannels.map(channel => (
              <div key={channel._id} className={styles.channel} onClick={() => handleJoinChannel(channel)}>
                <div className={styles.hashtag} />
                <h3>{helpers.shortenText(channel.name)}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottom_section}>
          <button type="button" onClick={handleLogout}>
            <RiLogoutCircleLine />
            <span>Log out</span>
          </button>
        </div>
      </div>

      <div className={`${styles.modal} ${isModalOpen ? styles.active : ""}`}>
        <h3>Create channel</h3>

        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name">Channel name</label>
          <div className={styles.input_container}>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              placeholder="new-channel"
              value={formData.name}
              onChange={event => handlers.handleFormDataChange(event.target.name, event.target.value, setFormData)}
            />
          </div>

          <div className={styles.buttons}>
            <button type="button" onClick={handleFormReset}>Close</button>
            <button type="submit" disabled={!formData.name || publicChannels.length >= 5}>Create</button>
          </div>
        </form>
      </div>

      <div className={`${styles.overlay} ${isModalOpen ? styles.active : ""}`} />
    </>
  );
}

export default Sidebar;