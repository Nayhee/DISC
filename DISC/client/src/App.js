import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "reactstrap";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";
import { getLoggedInUser } from "./modules/userProfileManager.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getLoggedInUser().then((user) => {
        setUser(user);
      });
    }
  }, [isLoggedIn]);

  if (isLoggedIn === null || user === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} userType={user?.userTypeId} />
      <ApplicationViews isLoggedIn={isLoggedIn} user={user} />
    </Router>
  );
}

export default App;
