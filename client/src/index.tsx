import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AuthContext, AuthContextProvider } from "contexts/auth.context";
import { ConversationsContextProvider } from "contexts/conversations.context";
import { MessagesContextProvider } from "contexts/messages.context";

import "styles/globals.scss";
const App = lazy(() => import("pages/app"));
const Login = lazy(() => import("pages/login"));
const Register = lazy(() => import("pages/register"));

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <AuthContextProvider>
      <ConversationsContextProvider>
        <MessagesContextProvider>
          <AuthContext.Consumer>
            {({ accessToken, type }) => (
              <>{accessToken ? <App /> : <>{type === "LOGIN" ? <Login /> : <Register />}</>}</>
            )}
          </AuthContext.Consumer>
        </MessagesContextProvider>
      </ConversationsContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
