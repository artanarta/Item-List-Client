import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LandingPage from "./Pages/Landing/Landing";
import Home from "./Pages/Home/Home";
import Subscribe from "./Pages/Subscribe/Subscribe";
import Owner from "./Pages/Owner/Owner";
import AddBook from "./Pages/Add Book/AddBook";
import Profile from "./Pages/Profile/Profile";
import DetailPage from "./Pages/Detail Page/DetailPage";
import ReadBook from "./Pages/Read Book/ReadBook";
import EditBook from "./Pages/Edit Book/EditBook";
import EditContentBook from "./Pages/Edit Content Book/EditContentBook";
import { UserContext } from "./Context/userContext";
import { API } from "./Config/api";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { setAuthToken } from "./Config/api";

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false) {
      history.push("/");
    } else {
      if (state.user.role === "Admin") {
        history.push("/owner");
      } else if (state.user.role === "Customer") {
        history.push("/home");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      console.log(payload, "payload");
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);


  return (
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/subs">
              <Subscribe />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/detail/:id">
              <DetailPage />
            </Route>
            <Route exact path="/read/:id">
              <ReadBook />
            </Route>
            <Route exact path="/owner">
              <Owner />
            </Route>
            <Route exact path="/addBook">
              <AddBook />
            </Route>
            <Route exact path="/editBook">
              <EditBook />
            </Route>
            <Route exact path="/editContentBook/:id">
              <EditContentBook />
            </Route>
          </Switch>


  );
}

export default App;