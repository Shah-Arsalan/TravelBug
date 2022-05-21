const initialState = {
  videos: [],
  liked: [],
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
      console.log("checking", action.payload.likes);
      return {
        ...state,
        liked: [...action.payload.likes],
      };
    }
  }
};

export { DataReducer, initialState };
