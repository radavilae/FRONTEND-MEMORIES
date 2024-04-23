import { useContext } from "react";
import "./App.css";
import { AuthContext } from "./contexts/AuthContext";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { HomePage } from "./pages/HomePage";
import CreateNewPostPage from "./pages/CreateNewPostPage";
import { IsProtected } from "./components/IsProtected";

function App() {
  //this is how you grab data from the context
  //or take food from the fridge
  const { user, setUser } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/home"
          element={
            <IsProtected>
              <HomePage />
            </IsProtected>
          }
        />
        <Route path="/post/" element={<CreateNewPostPage />} />

        <Route path="*" element={<h1>404 Not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
