import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { authenticateUser } = useContext(AuthContext);

  const nav = useNavigate();
  //this is the onSubmit function

  const handleLogin = async (event) => {
    event.preventDefault();
    const userToLogin = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:5005/auth/login",
        userToLogin
      );
      console.log("you logged in", response.data);

      localStorage.setItem("authToken", response.data.authToken);

      //only if you create the new user, then you navigate to the login page

      //if you log in successfully then store the authToken from the server in localstorage
      //before going to the home page, call the function set verify the token and set user

      await authenticateUser();
      nav("/home");
    } catch (err) {
      console.log(
        "there was an error signing up",
        err.response.data.errorMessage
      );
      setError(err.response.data.errorMessage);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button>Login</button>
      </form>
      {error ? <h4 className="error-message">{error}</h4> : null}
    </div>
  );
};
