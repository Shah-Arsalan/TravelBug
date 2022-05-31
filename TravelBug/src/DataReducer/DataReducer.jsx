const initialState = {
  videos: [],
  liked: [],
  history: [],
  watchlater: [],
  playlist: [],
};

const DataReducer = (state, action) => {
  console.log("state in reducer", state);

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

    case "PLAYLIST": {
      console.log("checking playlist", action.payload.playlists);
      console.log("sss", state.playlist);

      if (action.payload.playlists) {
        console.log("in if");
        return {
          ...state,
          playlist: [...action.payload.playlists],
        };
      } else {
        console.log("cc", action.payload.playlist);
        const currentPlaylist = state.playlist.filter(
          (ele) => ele._id === action.payload.playlist._id
        );
        console.log("currentplaylist", currentPlaylist);
        console.log("ttt", currentPlaylist[0].title);
        currentPlaylist[0].videos = [...action.payload.playlist.videos];
        console.log("currentplaylist2", currentPlaylist);
        return {
          ...state,
          playlist: [...state.playlist],
        };
      }
    }
  }
};

export { DataReducer, initialState };
