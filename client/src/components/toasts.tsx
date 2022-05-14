import { useCallback, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { RiEmotionHappyFill, RiEmotionUnhappyFill, RiCloseFill } from "react-icons/ri";

import { SystemContext } from "../contexts/system-context";
import type { ToastInterface } from "../interfaces/system-interfaces";

import styles from "../styles/components/toasts.module.scss";

const Toasts: React.FC = () => {
  const { toasts: [toasts, setToasts] } = useContext(SystemContext);

  const handleDeleteToast = useCallback((toastId: string) => {
    setToasts((prevState: ToastInterface[]) => prevState.filter(toast => toast._id !== toastId));
  }, [setToasts]);

  useEffect(() => {
    const deleteInterval = setInterval(() => {
      if(toasts.length) handleDeleteToast(toasts[0]._id);
    }, 2000);

    return () => clearInterval(deleteInterval);
  }, [toasts, handleDeleteToast]);

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      {toasts.map(toast => (
        <div key={toast._id} className={`${styles.toast} ${toast.type === "success" ? styles.success : styles.error}`}>
          <div className={styles.type}>
            {toast.type === "success" ? <RiEmotionHappyFill /> : <RiEmotionUnhappyFill />}
          </div>

          <div className={styles.details}>
            <h3>{toast.type === "success" ? "Great success!" : "Something went wrong!"}</h3>
            <p>{toast.message}</p>
          </div>

          <div className={styles.close} onClick={() => handleDeleteToast(toast._id)}><RiCloseFill /></div>
        </div>
      ))}
    </div>,
    document.getElementById("toasts") as HTMLDivElement
  );
}

export default Toasts;