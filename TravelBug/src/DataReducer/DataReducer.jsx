const initialState = {
  videos: [],
  liked: [],
  history: [],
  watchlater: [],
};

const DataReducer = (state, action) => {
  console.log(action.payload.videos);
  switch (action.type) {
    case "INITIAL_DATA_FETCH": {
      return {
        ...state,
        videos: [...action.payload.videos],
      };
    }

    case "LIKE": {
      return {
        ...state,
        liked: [...action.payload.likes],
      };
    }

    case "HISTORY": {
      console.log("checking history", action.payload.history);
      return {
        ...state,
        history: [...action.payload.history],
      };
    }

    case "WATCHLATER": {
      console.log("checking history", action.payload.history);
      return {
        ...state,
        watchlater: [...action.payload.watchlater],
      };
    }
  }
};

export { DataReducer, initialState };
