import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { user, handleLogout, handleCreatePost } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome {user.userName}</h1>

      <button onClick={handleLogout}>Logout</button>
      <Link to="/post">
        <button onClick={handleCreatePost}>CreatePost</button>
      </Link>
    </div>
  );
};
