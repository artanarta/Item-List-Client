import { BrowserRouter as Switch, Route } from "react-router-dom";
import LandingPage from "./Pages/Landing/Landing";
import AddItem from "./Pages/Add Item/AddItem";
import ListItem from "./Pages/List Item/ListItem";
import EditItem from "./Pages/Edit Item/EditItem";
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
      history.push("/list-item");
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
      <Route exact path="/add-item">
        <AddItem />
      </Route>
      <Route exact path="/list-item">
        <ListItem />
      </Route>
      <Route exact path="/item/:id">
        <EditItem />
      </Route>
    </Switch>
  );
}

export default App;