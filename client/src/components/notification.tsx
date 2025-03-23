import {
	RiCheckboxCircleFill,
	RiErrorWarningFill,
	RiInformation2Fill,
	RiSignalWifiErrorFill,
} from "react-icons/ri";

import styles from "@/styles/components/notification.module.scss";

interface Props {
	type: "SUCCESS" | "ERROR" | "SERVER_DOWN" | "";
	message: string;
}

export default function Notification({ type, message }: Props) {
	const getIcon = () => {
		switch (type) {
			case "SUCCESS":
				return <RiCheckboxCircleFill />;

			case "ERROR":
				return <RiErrorWarningFill />;

			case "SERVER_DOWN":
				return <RiSignalWifiErrorFill />;

			default:
				return <RiInformation2Fill />;
		}
	};

	const getTitle = () => {
		switch (type) {
			case "SUCCESS":
				return "Success";

			case "ERROR":
				return "Error";

			case "SERVER_DOWN":
				return "Server Down";

			default:
				return "Notification";
		}
	};

	return (
		<div className={`${styles["notification"]} ${styles[type.toLowerCase()]}`}>
			<div className={styles["icon"]}>{getIcon()}</div>
			<div className={styles["informations"]}>
				<h2 className={styles["title"]}>{getTitle()}</h2>
				<h3 className={styles["message"]}>{message}</h3>
			</div>
		</div>
	);
}
