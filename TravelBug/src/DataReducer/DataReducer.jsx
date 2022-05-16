const initialState = {
  videos: [],
};

const DataReducer = (state, action) => {
  switch (action.type) {
    case "INITIAL_DATA_FETCH": {
      return {
        ...state,
        videos: [...action.payload.videos],
      };
    }
  }
};

export { DataReducer, initialState };
