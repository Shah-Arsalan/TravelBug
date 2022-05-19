import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../Contexts/Authcontext";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const { signupHandler, token } = useAuth();
  const [signUpDetails, setSignUpDetails] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    confirmpassword: "",
  });

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [token]);

  return (
    <>
      <div className="signup-page">
        <div className="login-container">
          <div className="login-inputs signup-inputs">
            <h1>Sign Up</h1>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                signupHandler(
                  signUpDetails.email,
                  signUpDetails.password,
                  signUpDetails.firstname,
                  signUpDetails.lastname
                );
              }}
            >
              <div className="input">
                <label htmlFor="signup-email">Email</label>
                <input
                  required={true}
                  id="signup-email"
                  value={signUpDetails.email}
                  placeholder="user@gmail.com"
                  className="input-txt"
                  type="email"
                  onChange={(e) =>
                    setSignUpDetails({
                      ...signUpDetails,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input">
                <label htmlFor="signup-first">First name</label>
                <input
                  id="signup-first"
                  value={signUpDetails.firstname}
                  placeholder="Jon"
                  className="input-txt"
                  type="text"
                  onChange={(e) =>
                    setSignUpDetails({
                      ...signUpDetails,
                      firstname: e.target.value,
                    })
                  }
                />
              </div>

              <div className="input">
                <label htmlFor="signup-last">Last Name</label>
                <input
                  id="signup-last"
                  value={signUpDetails.lastname}
                  placeholder="Doe"
                  className="input-txt"
                  type="text"
                  onChange={(e) =>
                    setSignUpDetails({
                      ...signUpDetails,
                      lastname: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input">
                <label htmlFor="signup-password">Password</label>
                <input
                  required={true}
                  id="signup-password"
                  value={signUpDetails.password}
                  placeholder="********"
                  className="input-txt"
                  type="password"
                  onChange={(e) =>
                    setSignUpDetails({
                      ...signUpDetails,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input">
                <label htmlFor="conf-password">Confirm Password</label>
                <input
                  id="conf-password"
                  value={signUpDetails.confirmpassword}
                  placeholder="********"
                  className="input-txt"
                  type="password"
                  onChange={(e) =>
                    setSignUpDetails({
                      ...signUpDetails,
                      confirmpassword: e.target.value,
                    })
                  }
                />
              </div>

              <div className="input forgot-password">
                <div className="list-item">
                  <input id="item-1" type="checkbox" name="checkbox-input" />
                  <label for="item-1">I accept all terms and conditions</label>
                </div>
              </div>

              <div className="input btn-input">
                <button type="submit" className="primary-button">
                  Create Account
                </button>
              </div>

              <div className="input flex-justify-center user-link">
                <a onClick={() => navigate("/login")}>Already a user? Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export { Signup };
