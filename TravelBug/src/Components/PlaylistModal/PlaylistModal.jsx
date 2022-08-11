import "./PlaylistModal.css";
import axios from "axios";
import { useState } from "react";
import { useData } from "../../Contexts/Datacontext";
import { useSelector , useDispatch } from "react-redux";
import { addToPlaylistHandler, createPlaylistHandler, removeFromPlaylistHandler } from "../../redux/videoSlice";
const PlaylistModal = () => {
  const { state, dispatch } = useData();
  const videoDispatch = useDispatch()
  console.log("the state and data is" , state , dispatch)
  const auth = useSelector(state => state.auth)
  const videoData = useSelector(state => state.video)
  const token = auth.token
  const { modal, setModal, activeVideo, setActiveVideo } = useData();
  const [playlistTitle, setTitle] = useState("");
  const { videos , playlist } = videoData;
  const video = videos?.find((element) => element._id === activeVideo) || {};

  const createPlaylist = async () => {

    videoDispatch(createPlaylistHandler({token , playlistTitle}))
  };

  const playlistHandler = async (e, elem) => {
    const currentPlaylist = playlist.filter((ele) => ele != elem);

    if (e.target.checked) {
      // try {
      //   const res = await axios.post(
      //     `/api/user/playlists/${elem._id}`,
      //     { video },
      //     { headers: { authorization: token } }
      //   );
      //   if (res.status === 200 || res.status === 201) {
      //     dispatch({
      //       type: "PLAYLIST",
      //       payload: { playlist: res.data.playlist },
      //     });
      //   }
      // } catch (error) {
      //   console.log("The error is : ", error);
      // }
      videoDispatch(addToPlaylistHandler({elem , video , token}))
    } else {
      // console.log("un-checked");
      // try {
      //   const res = await axios.delete(
      //     `/api/user/playlists/${elem._id}/${activeVideo}`,
      //     { headers: { authorization: token } }
      //   );
      //   console.log("del response", res.data.playlist);
      //   if (res.status === 200 || res.status === 201) {
      //     dispatch({
      //       type: "PLAYLIST",
      //       payload: { playlist: res.data.playlist },
      //     });
      //   }
      // } catch (error) {
      //   console.log("The error is : ", error);
      // }
      const pId = elem?._id
      const _id = activeVideo
      videoDispatch(removeFromPlaylistHandler({pId , _id , token }))
    }
  };

  return (
    <>
      <div className="plist-m-container">
        <div className="plist-m">
          <div className="heading-container">
            <p className="heading-txt">Add to playlist</p>
            <i onClick={() => setModal(false)} class="fas fa-times"></i>
          </div>

          <div className="playlists">
            {playlist?.map((elem) => {
              const inPlaylist = elem.videos?.some(
                (elem) => elem._id === activeVideo
              );
              return (
                <>
                  <div className="playlist-child">
                    <input
                      checked={inPlaylist}
                      onChange={(e) => playlistHandler(e, elem)}
                      type="checkbox"
                      id={elem.title}
                    />
                    <label htmlFor={elem.title}>{elem.title}</label>
                  </div>
                </>
              );
            })}
          </div>
          <div className="input-container">
            <p>Name:</p>
            <input
              value={playlistTitle}
              onChange={(e) => setTitle(e.target.value)}
              name="playlistName"
              type="text"
            />
            <button
              className="primary-button"
              onClick={() => {
                setTitle("");
                createPlaylist();
              }}
            >
              Create New
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export { PlaylistModal };
