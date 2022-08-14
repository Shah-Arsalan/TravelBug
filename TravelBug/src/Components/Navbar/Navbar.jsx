import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authenticationSlice";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const token = auth.token
  const [appearModal, setAppearModal] = useState(false);

  return (
    <>
      <div class="nav-container">
        <div>
          <h2 class="title">Travel Bug</h2>
        </div>

        <div class="icons">
          {token && (
            <i
              onClick={() => setAppearModal((prev) => !prev)}
              class="fas fa-user user"
            ></i>
          )}
        </div>
        {appearModal && (
          <div
            onClick={() => {
              dispatch(logout())
              setAppearModal((prev) => !prev);
            }}
            className="card-modal-main user-modal-container"
          >
            <div>
              <p className="main-modal-child user-modal border-1px">Logout</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export { Navbar };
