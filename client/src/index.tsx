import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { UsersProvider, UsersContext } from "./contexts/users-context";
import { ChannelsProvider } from "./contexts/channels-context";
import { MessagesProvider } from "./contexts/messages-context";

import "./styles/globals.scss";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";

const App: React.FC = () => {
  const { token: [token] } = useContext(UsersContext);
  const [auth, setAuth] = useState("login");

  useEffect(() => {
    setAuth("login");
  }, [token]);

  if (!token) {
    if (auth === "login") return <Login setAuth={setAuth} />
    else return <Register setAuth={setAuth} />
  }
  
  return <Home />;
}

ReactDOM.render(
  <React.StrictMode>
    <UsersProvider>
      <ChannelsProvider>
        <MessagesProvider>
          <App />
        </MessagesProvider>
      </ChannelsProvider>
    </UsersProvider>
  </React.StrictMode>,
  document.getElementById("root")
);