import React, { useState, useContext  } from "react";
import { Modal } from "react-bootstrap";
import StyleSignin from "./Signin.module.css";
import { UserContext } from "../../../Context/userContext";
import { useHistory } from "react-router-dom";
import { API, setAuthToken } from "../../../Config/api";
import { Alert } from "react-bootstrap";

function Signin() {
  //router
  const router = useHistory();

  //useContext
   const [state,  dispatch] = useContext(UserContext);
   console.log(state);

  //handle login
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

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
  
  //modal sign in
  const [show, setShow] = useState(false);
  const showingModalLogin = () => setShow(true);
  const closingModalLogin = () => setShow(false);

  return (
    <div>
      <button onClick={showingModalLogin} className="btn" style={{ width: "150px", height: "50px", background: "#CDCDCDB2" }}>
      <h5>Sign In</h5>
      </button>

      <Modal
        show={show}
        onHide={closingModalLogin}
        className={StyleSignin.background}>
          
        <Modal.Body>
          <div>
            <p className={StyleSignin.title}>Sign In</p>
            <form className={StyleSignin.signinForm}  onSubmit={handleSubmit}>
            {message && message}
              <div className="form-group">
                <input
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className={StyleSignin.inputField}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  type="password"
                  className={StyleSignin.inputField}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-group">
                <input type="submit"  value="Sign in" className={StyleSignin.button}>
                </input>
              </div>
            </form>
            <p className={StyleSignin.clickedHere}>Don't have an account ?  Click Here </p>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default Signin;