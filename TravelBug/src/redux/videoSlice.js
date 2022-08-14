import { createSlice, current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  videos: [],
  liked: [],
  history: [],
  watchlater: [],
  playlist: [],
};

const initialDataFetch = createAsyncThunk("data/initialFetch", async () => {
  try {
    const response = await axios.get("/api/videos");

    console.log("the resp is", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const getLikesHandler = createAsyncThunk("data/getLikes", async (token) => {
  console.log("the video and token is", token);
  try {
    const response = await axios.get("/api/user/likes", {
      headers: {
        authorization: token,
      },
    });
    console.log("like response is", response);
    return response.data.likes;
  } catch (error) {
    console.error(error);
  }
});

const addLikeHandler = createAsyncThunk(
  "data/addlike",
  async ({ video, token }) => {
    console.log("the video and token is", video, token);
    try {
      const response = await axios.post(
        `/api/user/likes/`,
        { video },
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log("like response is", response.data.likes);
      return response.data.likes;
    } catch (error) {
      console.error(error);
    }
  }
);

const deleteLikeHandler = createAsyncThunk(
  "data/removelike",
  async ({ token, _id }) => {
    console.log("the video and token is", _id);
    try {
      const response = await axios.delete(`/api/user/likes/${_id}`, {
        headers: {
          authorization: token,
        },
      });
      console.log("like response is", response);
      return response.data.likes;
    } catch (error) {
      console.error(error);
    }
  }
);

const getHistoryHandler = createAsyncThunk("data/getHistory", async (token) => {
  console.log("the video and token is", token);
  try {
    const response = await axios.get("/api/user/history", {
      headers: {
        authorization: token,
      },
    });
    console.log("history response is", response);
    return response.data.history;
  } catch (error) {
    console.error(error);
  }
});

const addHistoryHandler = createAsyncThunk(
  "data/addHistory",
  async ({ video, token }) => {
    console.log("the video and token is", video, token);
    try {
      const response = await axios.post(
        "/api/user/history",
        { video },
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log("history response is", response);
      return response.data.history;
    } catch (error) {
      console.error(error);
    }
  }
);

const deleteHistoryHandler = createAsyncThunk(
  "data/deletehistory",
  async ({ token, _id }) => {
    console.log("the video and token is", _id);
    try {
      const response = await axios.delete(`/api/user/history/${_id}`, {
        headers: {
          authorization: token,
        },
      });
      console.log("like response is", response);
      return response.data.history;
    } catch (error) {
      console.error(error);
    }
  }
);

const getWatchLaterHandler = createAsyncThunk(
  "data/getWatchlater",
  async (token) => {
    console.log("the video and token is", token);
    try {
      const response = await axios.get("/api/user/watchlater", {
        headers: {
          authorization: token,
        },
      });
      console.log("watchlater response is", response);
      return response.data.watchlater;
    } catch (error) {
      console.error(error);
    }
  }
);

const addWatchLaterHandler = createAsyncThunk(
  "data/addWatchLater",
  async ({ video, token }) => {
    console.log("the video and token is", video, token);
    try {
      const response = await axios.post(
        "/api/user/watchlater",
        { video },
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log("watchlater response is", response);
      return response.data.watchlater;
    } catch (error) {
      console.error(error);
    }
  }
);

const deleteWatchLaterHandler = createAsyncThunk(
  "data/deleteWatchLater",
  async ({ token, _id }) => {
    console.log("the video and token is", _id);
    try {
      const response = await axios.delete(`/api/user/watchlater/${_id}`, {
        headers: {
          authorization: token,
        },
      });
      console.log("watchlater response is", response);
      return response.data.watchlater;
    } catch (error) {
      console.error(error);
    }
  }
);

const getPlaylistHandler = createAsyncThunk(
  "data/getPlaylists",
  async (token) => {
    console.log("the video and token is", token);
    try {
      const response = await axios.get("/api/user/playlists", {
        headers: {
          authorization: token,
        },
      });
      console.log("playlists response is", response);
      return { playlists: response.data.playlists };
    } catch (error) {
      console.error(error);
    }
  }
);

const createPlaylistHandler = createAsyncThunk(
  "data/createPlaylist",
  async ({ token, playlistTitle }) => {
    console.log("the video and token is", token);
    try {
      const response = await axios.post(
        "/api/user/playlists",
        { playlist: { title: playlistTitle, description: "bar bar bar" } },
        { headers: { authorization: token } }
      );
      console.log("like response is", response.data.playlists);
      return { playlists: response.data.playlists };
    } catch (error) {
      console.error(error);
    }
  }
);

const deletePlaylistHandler = createAsyncThunk(
  "data/deletePlaylist",
  async ({ playlistId, token }) => {
    console.log("the video and token is");
    try {
      const response = await axios.delete(`/api/user/playlists/${playlistId}`, {
        headers: {
          authorization: token,
        },
      });
      console.log("playlist response is", response);
      return { playlists: response.data.playlists };
    } catch (error) {
      console.error(error);
    }
  }
);

const getCurrentPlaylistHandler = createAsyncThunk(
  "data/getCurrentPlaylist",
  async ({ playlistid, token }) => {
    console.log("the video and token is", token);
    try {
      const response = await axios.get(`/api/user/playlists/${playlistid}`, {
        headers: {
          authorization: token,
        },
      });
      console.log("playlists response is", response);
      return { playlist: response.data.playlist };
    } catch (error) {
      console.error(error);
    }
  }
);

const addToPlaylistHandler = createAsyncThunk(
  "data/addToPlaylist",
  async ({ elem, video, token }) => {
    console.log("the video and token is", token);
    try {
      const response = await axios.post(
        `/api/user/playlists/${elem._id}`,
        { video },
        { headers: { authorization: token } }
      );
      console.log("add to playlist resp  response is", response.data.playlist);
      return { playlist: response.data.playlist };
    } catch (error) {
      console.error(error);
    }
  }
);

const removeFromPlaylistHandler = createAsyncThunk(
  "data/removeFromPlaylist",
  async ({ pId, _id, token }) => {
    console.log("the video and token is");
    try {
      const response = await axios.delete(`/api/user/playlists/${pId}/${_id}`, {
        headers: { authorization: token },
      });
      console.log("playlist response is", response);
      return { playlist: response.data.playlist };
    } catch (error) {
      console.error(error);
    }
  }
);

const videoSlice = createSlice({
  name: "videoData",
  initialState,
  extraReducers: {
    // for initial data fetch

    [initialDataFetch.pending]: (action) => {
      console.log("the action is", action);
    },
    [initialDataFetch.fulfilled]: (state, action) => {
      console.log("the action is ", action);
      console.log("vid response initial", action.payload.videos);
      state.videos = action.payload.videos;
    },

    [initialDataFetch.rejected]: (action) => {
      console.error(action.payload);
    },

    // getting history

    [getLikesHandler.pending]: (action) => {
      console.log("the action is", action);
    },
    [getLikesHandler.fulfilled]: (state, action) => {
      state.liked = action.payload;
    },

    [getLikesHandler.rejected]: (action) => {
      console.error(action.payload);
    },

    // for adding to liked videos

    [addLikeHandler.pending]: (action) => {
      console.log("the action is", action);
    },
    [addLikeHandler.fulfilled]: (state, action) => {
      console.log("likes is is is ", action.payload);
      state.liked = action.payload;
    },

    [addLikeHandler.rejected]: (action) => {
      console.error(action.payload);
    },

    // for removing from likes videos

    [deleteLikeHandler.pending]: (action) => {
      console.log("the action is", action);
    },
    [deleteLikeHandler.fulfilled]: (state, action) => {
      console.log("likes is", action.payload);
      state.liked = action.payload;
    },

    [deleteLikeHandler.rejected]: (action) => {
      console.error(action.payload);
    },

    // getting history

    [getHistoryHandler.pending]: (action) => {
      console.log("the action is", action);
    },
    [getHistoryHandler.fulfilled]: (state, action) => {
      state.history = action.payload;
    },

    [getHistoryHandler.rejected]: (action) => {
      console.error(action.payload);
    },

    // for adding to history

    [addHistoryHandler.pending]: (action) => {
      console.log("the action is", action);
    },
    [addHistoryHandler.fulfilled]: (state, action) => {
      state.history = action.payload;
    },

    [addHistoryHandler.rejected]: (action) => {
      console.error(action.payload);
    },

    // for removing from history

    [deleteHistoryHandler.pending]: (action) => {
      console.log("the action is", action);
    },
    [deleteHistoryHandler.fulfilled]: (state, action) => {
      console.log("likes is", action.payload);
      state.history = action.payload;
    },

    [deleteHistoryHandler.rejected]: (action) => {
      console.error(action.payload);
    },

    // getting watchlater

    [getWatchLaterHandler.pending]: (action) => {
      console.log("the action is", action);
    },
    [getWatchLaterHandler.fulfilled]: (state, action) => {
      state.watchlater = action.payload;
    },

    [getWatchLaterHandler.rejected]: (action) => {
      console.error(action.payload);
    },

    // for adding to WatchLater

    [addWatchLaterHandler.pending]: (action) => {
      console.log("the action is", action);
    },
    [addWatchLaterHandler.fulfilled]: (state, action) => {
      state.watchlater = action.payload;
    },

    [addWatchLaterHandler.rejected]: (action) => {
      console.error(action.payload);
    },

    // for removing from WatchLater

    [deleteWatchLaterHandler.pending]: (action) => {
      console.log("the action is", action);
    },
    [deleteWatchLaterHandler.fulfilled]: (state, action) => {
      console.log("likes is", action.payload);
      state.watchlater = action.payload;
    },

    [deleteWatchLaterHandler.rejected]: (action) => {
      console.error(action.payload);
    },

    // for getting a playlist

    [getPlaylistHandler.pending]: (action) => {
      console.log("the action is", action);
    },
    [getPlaylistHandler.fulfilled]: (state, action) => {
      console.log("the playlist is 1 ", state.playlist);
      if (action.payload.playlists) {
        state.playlist = action.payload.playlists;
      }
    },

    [getPlaylistHandler.rejected]: (action) => {
      console.error(action.payload);
    },

    // for creating a playlist

    [createPlaylistHandler.pending]: (action) => {
      console.log("the action is", action);
    },
    [createPlaylistHandler.fulfilled]: (state, action) => {
      console.log("the playlist is 1 ", state.playlist);
      if (action.payload.playlists) {
        state.playlist = action.payload.playlists;
      }
    },

    [createPlaylistHandler.rejected]: (action) => {
      console.error(action.payload);
    },

    // for deleting a playlist

    [deletePlaylistHandler.pending]: (action) => {
      console.log("the action is", action);
    },
    [deletePlaylistHandler.fulfilled]: (state, action) => {
      if (action.payload.playlists) {
        state.playlist = action.payload.playlists;
      }
    },

    [deletePlaylistHandler.rejected]: (action) => {
      console.error(action.payload);
    },

    // for getting current playlist

    [getCurrentPlaylistHandler.pending]: (action) => {
      console.log("the action is", action);
    },
    [getCurrentPlaylistHandler.fulfilled]: (state, action) => {
      console.log("the playlist is 2 ", state);
      const currentPlaylist = state.playlist.filter(
        (ele) => ele._id === action.payload.playlist._id
      );
      currentPlaylist[0].videos = action.payload.playlist.videos;
    },

    // for adding video to a playlist

    [getCurrentPlaylistHandler.pending]: (action) => {
      console.log("the action is", action);
    },
    [addToPlaylistHandler.fulfilled]: (state, action) => {
      console.log("the playlist is 2 ", state);
      const currentPlaylist = state.playlist.filter(
        (ele) => ele._id === action.payload.playlist._id
      );
      currentPlaylist[0].videos = action.payload.playlist.videos;
    },

    [addToPlaylistHandler.rejected]: (action) => {
      console.error(action.payload);
    },

    // for removing video from a playlist

    [removeFromPlaylistHandler.pending]: (action) => {
      console.log("the action is", action);
    },
    [removeFromPlaylistHandler.fulfilled]: (state, action) => {
      console.log("the playlist is 3 ", state);
      const currentPlaylist = state.playlist.filter(
        (ele) => ele._id === action.payload.playlist._id
      );
      currentPlaylist[0].videos = action.payload.playlist.videos;
    },

    [removeFromPlaylistHandler.rejected]: (action) => {
      console.error(action.payload);
    },
  },
});

export default videoSlice.reducer;
export {
  initialDataFetch,
  addLikeHandler,
  deleteLikeHandler,
  addHistoryHandler,
  deleteHistoryHandler,
  addWatchLaterHandler,
  deleteWatchLaterHandler,
  createPlaylistHandler,
  deletePlaylistHandler,
  addToPlaylistHandler,
  removeFromPlaylistHandler,
  getHistoryHandler,
  getLikesHandler,
  getWatchLaterHandler,
  getPlaylistHandler,
  getCurrentPlaylistHandler,
};
