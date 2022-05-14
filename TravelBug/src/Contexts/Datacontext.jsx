import { useContext, createContext, useReducer, useEffect } from "react";
import { DataReducer, initialState } from "../DataReducer/DataReducer";
import axios from "axios";

const Datacontext = createContext();
const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const fetchedData = await axios.get("/api/videos");

        if (fetchedData.status === 200 || fetchedData.status === 201)
          dispatch({
            type: "INITIAL_DATA_FETCH",
            payload: { videos: fetchedData.data.videos },
          });
      } catch (error) {
        console.log(error);
      } finally {
      }
    })();
  }, []);
  return (
    <Datacontext.Provider value={{ state, dispatch }}>
      {children}
    </Datacontext.Provider>
  );
};
const useData = () => useContext(Datacontext);

export { DataProvider, useData };
