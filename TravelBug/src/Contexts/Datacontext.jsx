import {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useState,
} from "react";


const Datacontext = createContext();
const DataProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState({});

  return (
    <Datacontext.Provider
      value={{  modal, setModal, activeVideo, setActiveVideo }}
    >
      {children}
    </Datacontext.Provider>
  );
};
const useData = () => useContext(Datacontext);

export { DataProvider, useData };
