import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const IsProtected = ({ children }) => {
  const nav = useNavigate();
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!isLoggedIn) {
    nav("/login");
  }
  return <div>{children}</div>;
};
