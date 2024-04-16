import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const HomePage = () => {
  const { user } = useContext(AuthContext);

  return <div>Welcome {user.userName}</div>;
};
