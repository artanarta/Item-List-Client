import React, { useState, useContext } from "react";
import { Alert, Container } from "react-bootstrap";
import { UserContext } from "../../Context/userContext";
import { API, setAuthToken } from "../../Config/api";
import styles from "./Landing.module.css";
import { useHistory } from "react-router-dom";

function Landing() {
  const [state, dispatch] = useContext(UserContext);
  console.log(state);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = form;
  const history = useHistory();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", body, config);
      console.log(response);

      // Send data to useContext
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.user,
      });

      setAuthToken(response.data.data.user.token);

      const alert = (
        <Alert variant="success" className="py-1">
          Login success
        </Alert>
      );
      setMessage(alert);

      // Redirect
      history.push("/list-item");
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <div className={styles.fullscreen}>
      <Container>
        <div className={styles.formLanding}  >
          <p className={styles.title}>Welcome</p>
          <form className={styles.signinForm} onSubmit={handleSubmit}>
            {message && message}
            <div>
              <input
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
                className={styles.inputField}
                placeholder="Username"
                required
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                type="password"
                className={styles.inputField}
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group">
              <input type="submit" value="Sign in" className={styles.Signinbutton} />
            </div>
          </form>

        </div>
      </Container >
    </div >
  );
}

export default Landing;
