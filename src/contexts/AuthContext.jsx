import axios from "axios";
import { createContext, useEffect, useState } from "react";

//This is crating the context
const AuthContext = createContext();

//This is the wrapper that will wrap our <App>
const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //this function checks if there is a token and if so, if it is valid

  const authenticateUser = async () => {
    //check the localstoage for the token
    const theToken = localStorage.getItem("authToken");
    if (theToken) {
      try {
        //console.log("here is the token", theToken);
        //this is if there is a token then we need to verify it

        const response = await axios.post("http://localhost:5005/auth/verify", {
          headers: {
            authorization: `Bearer ${theToken}`,
            post: `Bearer ${theToken}`,
          },
        });
        console.log("from the authenticate user function", response.data);
        setUser(response.data);
        setIsLoading(false);
        setIsLoggedIn(true);
      } catch (err) {
        console.log("there was an error authenticating the user", err);
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
    //if there is a token then valid it with the /verify route
    //if no token then set states to null and isLoggedIn to false
  };

  //everytime the application mounts, we try to authenticate the user
  useEffect(() => {
    authenticateUser();
  }, []);

  //logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  return (
    //the value is basically the frig, where all the food is stored
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isLoggedIn,
        authenticateUser,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//make sure to export both the wrapper and the context
export { AuthContext, AuthWrapper };
