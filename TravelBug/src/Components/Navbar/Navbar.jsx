import { useState } from "react";
import { useAuth } from "../../Contexts/Authcontext";
import "./Navbar.css";

const Navbar = () => {
  const { logoutHandler, token } = useAuth();
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
              logoutHandler();
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
