import { lazy, useState } from "react";
import { useConversationsContext } from "contexts/conversations.context";

import styles from "styles/pages/app.module.scss";
const Chat = lazy(() => import("components/chat"));
const Search = lazy(() => import("components/search"));
const Sidebar = lazy(() => import("components/sidebar"));

const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const conversationsContext = useConversationsContext();

  return (
    <div className={styles["page"]}>
      <div className={styles["container"]}>
        <Sidebar setIsSearchOpen={setIsSearchOpen} />
        <Search
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />

        {conversationsContext.conversation._id ? (
          <Chat />
        ) : (
          <div className={styles["idle"]}>
            <img
              alt="logo greyed out"
              src="/logo-greyed.svg"
            />
            <h3>No active conversation</h3>
            <p>Connect with friends and the world around you. It's quick and easy!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
