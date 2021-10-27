import React, { useContext,useState } from "react";
import { Modal } from "react-bootstrap";
import StyleSignup from "./Signup.module.css";

import { UserContext } from "../../../Context/userContext";
import { API} from "../../../Config/api";
import { Alert } from "react-bootstrap";

function Signup() {

  //useContext
   const [state] = useContext(UserContext);
   console.log(state);

  //handle register
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Customer",
  });

  const { fullName, email, password, role } = form;

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

       // Insert data user to database
      const response = await API.post("/register", body, config);

       // Notification
       if (response.data.status === "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        setForm({
          fullName: "",
          email: "",
          password: "",
          role: "Customer",
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
          Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };
  
  
  //modal sign up
  const [show, setShow] = useState(false);
  const showingModalRegister = () => setShow(true);
  const closingModalRegister = () => setShow(false);

  return (
    <div>
      <button onClick={showingModalRegister} className="btn"  style={{ width: "150px", height: "50px", background: "#D60000" }}>
      <h5 style={{ color:"white"}}>Sign up</h5>
      </button>

      <Modal
        show={show}
        onHide={closingModalRegister}
        className={StyleSignup.background}>
          
        <Modal.Body>
          <div>
            <p className={StyleSignup.title}>Sign Up</p>
           
            <form className={StyleSignup.signinForm}  onSubmit={handleSubmit}>
            {message && message}
              <div className="form-group">
                <input
                  id="email"
                  value={email}
                  name="email"
                  onChange={handleChange}
                  className={StyleSignup.inputField}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  id="password"
                  value={password}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  className={StyleSignup.inputField}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-group">
                <input
                   id="fullName"
                  value={fullName}
                  name="fullName"
                  onChange={handleChange}
                  className={StyleSignup.inputField}
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className="form-group">
                <button className={StyleSignup.button} >
                  Sign Up
                </button>
              </div>
            </form>
            <p className={StyleSignup.clickedHere}>Already have an account ? Click Here </p>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default Signup;