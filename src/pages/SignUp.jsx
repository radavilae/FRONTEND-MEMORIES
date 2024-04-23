import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const nav = useNavigate();
  //this is the onSubmit function

  const handleSignup = async (event) => {
    event.preventDefault();
    const userToCreate = { userName, email, password };

    try {
      const response = await axios.post(
        "http://localhost:5005/auth/signup",
        userToCreate
      );
      console.log("you created a user", response.data);
      //only if you create the new user, then you navigate to the login page

      nav("/login");
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
      <h2>Sign Up with us</h2>
      <form onSubmit={handleSignup}>
        <label>
          User Name:
          <input
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </label>

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
        <button>Sign Up</button>
      </form>
      {error ? <h4 className="error-message">{error}</h4> : null}
    </div>
  );
};
