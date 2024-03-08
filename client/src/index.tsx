import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { AuthContext, AuthContextProvider } from "contexts/auth.context";
import { ConversationContextProvider } from "contexts/conversation.context";
import { MessageContextProvider } from "contexts/message.context";

import "styles/globals.scss";

const App = lazy(() => import("pages/app"));
const Login = lazy(() => import("pages/login"));
const Register = lazy(() => import("pages/register"));

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<StrictMode>
		<>
			<SpeedInsights />
			<AuthContextProvider>
				<ConversationContextProvider>
					<MessageContextProvider>
						<AuthContext.Consumer>
							{({ accessToken, type }) => (
								<>{accessToken ? <App /> : <>{type === "LOGIN" ? <Login /> : <Register />}</>}</>
							)}
						</AuthContext.Consumer>
					</MessageContextProvider>
				</ConversationContextProvider>
			</AuthContextProvider>
		</>
	</StrictMode>
);
