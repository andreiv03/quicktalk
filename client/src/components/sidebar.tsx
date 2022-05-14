import { useContext, useState } from "react";
import { GoPlus } from "react-icons/go";
import { RiLogoutCircleLine } from "react-icons/ri";

import { SystemContext } from "../contexts/system-context";
import { UsersContext, userInitialState } from "../contexts/users-context";
import { ChannelsContext } from "../contexts/channels-context";
import socket from "../services/socket";
import handlers from "../utils/handlers";
import helpers from "../utils/helpers";
import type { ChannelInterface } from "../interfaces/channels-interfaces";

import styles from "../styles/components/sidebar.module.scss";

const formDataInitialState: Omit<ChannelInterface, "_id"> = {
  creator: "",
  name: "",
  type: ""
};

const Sidebar: React.FC = () => {
  const { createNewToast } = useContext(SystemContext);
  const { token: [token, setToken], user: [user, setUser] } = useContext(UsersContext);
  const { currentChannel: [currentChannel, setCurrentChannel], publicChannels } = useContext(ChannelsContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<ChannelInterface, "_id">>(formDataInitialState);

  const handleJoinChannel = (channel: ChannelInterface) => {
    if (currentChannel._id === channel._id) return;
    if (currentChannel._id) socket.emit("leave_channel", currentChannel._id);
    socket.emit("join_channel", channel._id);
    setCurrentChannel(channel);
  }

  const handleNewForm = (type: string) => {
    setIsModalOpen(true);
    setFormData({ creator: user._id, name: "", type });
  }

  const handleCreateChannel = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { default: channelsService } = await import("../services/channels-service");
      const { data } = await channelsService.createChannel(token, { ...formData, name: formData.name.replace(/-$/, "") });
      socket.emit("create_channel", data);
      setCurrentChannel(data);
      setIsModalOpen(false);
      setFormData(formDataInitialState);
    } catch (error: any) {
      return createNewToast(error, "error");
    }
  }

  const handleLogout = async () => {
    try {
      const { default: authService } = await import("../services/auth-service");
      await authService.logout();
      if (currentChannel._id) socket.emit("leave_channel", currentChannel._id);
      setToken("");
      setUser(userInitialState);
      setCurrentChannel({} as ChannelInterface);
      setIsModalOpen(false);
      localStorage.removeItem("authenticated");
    } catch (error: any) {
      return createNewToast(error, "error");
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

        <form onSubmit={handleCreateChannel}>
          <label htmlFor="name">Channel name</label>
          <div className={styles.input_container}>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              placeholder="new-channel"
              value={formData.name}
              onChange={event => handlers.handleFormDataChange(event.target.name, event.target.value, setFormData, "channel")}
            />
          </div>

          <div className={styles.buttons}>
            <button type="button" onClick={() => { setIsModalOpen(false); setFormData(formDataInitialState); }}>Close</button>
            <button type="submit" disabled={!formData.name || publicChannels.length >= 5 || formData.name.length > 25}>Create</button>
          </div>
        </form>
      </div>

      <div className={`${styles.overlay} ${isModalOpen ? styles.active : ""}`} />
    </>
  );
}

export default Sidebar;