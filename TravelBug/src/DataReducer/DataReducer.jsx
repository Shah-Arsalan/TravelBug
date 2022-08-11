// ****************************** Redundant file , to be removed later ***************************************//
// ****************************** Redundant file , to be removed later ***************************************//
// ****************************** Redundant file , to be removed later ***************************************//
// ****************************** Redundant file , to be removed later ***************************************//
// ****************************** Redundant file , to be removed later ***************************************//



// const initialState = {
//   videos: [],
//   liked: [],
//   history: [],
//   watchlater: [],
//   playlist: [],
// };

// const DataReducer = (state, action) => {
//   switch (action.type) {
//     case "INITIAL_DATA_FETCH": {
//       return {
//         ...state,
//         videos: [...action.payload.videos],
//       };
//     }

//     case "LIKE": {
//       return {
//         ...state,
//         liked: [...action.payload.likes],
//       };
//     }

//     case "HISTORY": {
//       return {
//         ...state,
//         history: [...action.payload.history],
//       };
//     }

//     case "WATCHLATER": {
//       return {
//         ...state,
//         watchlater: [...action.payload.watchlater],
//       };
//     }

//     case "PLAYLIST": {
//       if (action.payload.playlists) {
//         return {
//           ...state,
//           playlist: [...action.payload.playlists],
//         };
//       } else {
//         const currentPlaylist = state.playlist.filter(
//           (ele) => ele._id === action.payload.playlist._id
//         );

//         currentPlaylist[0].videos = [...action.payload.playlist.videos];

//         return {
//           ...state,
//           playlist: [...state.playlist],
//         };
//       }
//     }
//   }
// };

// export { DataReducer, initialState };
