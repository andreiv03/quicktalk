import { createContext, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import type { ToastInterface } from "../interfaces/system-interfaces";

interface ProviderStateInterface {
  toasts: [ToastInterface[], React.Dispatch<React.SetStateAction<ToastInterface[]>>];
  createNewToast: (message: string, type: string) => void;
};

export const SystemContext = createContext<ProviderStateInterface>({} as ProviderStateInterface);

export const SystemProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastInterface[]>([]);

  const createNewToast = useCallback((data: any, type: string) => {
    const message = data.response.data.message;
    setToasts((prevState: ToastInterface[]) => [...prevState, { _id: uuidv4(), message, type }]);
  }, []);

  const state: ProviderStateInterface = {
    toasts: [toasts, setToasts],
    createNewToast
  };

  return (
    <SystemContext.Provider value={state}>
      {children}
    </SystemContext.Provider>
  );
}