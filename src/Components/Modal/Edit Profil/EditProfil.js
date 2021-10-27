import React, { useContext,useState,useEffect } from "react";
import { Modal } from "react-bootstrap";
import StyleEditProfil from "./EditProfil.module.css";
import { UserContext } from "../../../Context/userContext";
import { API} from "../../../Config/api";
import { Alert } from "react-bootstrap";
import attachment from  "../../../Assets/Images/attachment.png";

function EditProfil() {

  //useContext
   const [state] = useContext(UserContext);
   const [preview, setPreview] = useState(null); 

   const [message, setMessage] = useState(null);
   const [form, setForm] = useState({
    fullName: "",
    gender: "",
    phone: "",
    address: "",
    image : "",
  });

   const getUser = async () => {
    try {
      setForm({
        ...form,
        fullName: state.user.fullName,
        phone: state.user.phone ,
        gender: state.user.gender ,
        address: state.user.address,
        image: state.user.image,
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("fullName", form.fullName);
      formData.set("gender", form.gender);
      formData.set("phone", form.phone);
      formData.set("address", form.address);
      formData.set("image", form.image);

      const response = await API.patch("/user/" + state.user.id, formData, config);
      console.log(response);

       // Notification
       if (response.data.status === "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        window.location.reload();
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
          Please Edit Picture </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    getUser();
  }, []);
      
  
  //modal edit profil
  const [show, setShow] = useState(false);
  const showingModalProfile = () => setShow(true);
  const closingModalProfile = () => setShow(false);

  return (
    <div>
      <button onClick={showingModalProfile} className="btn"  style={{borderRadius:"5px", width:"200px", height:"40px", marginTop:"10px", backgroundColor:"#D60000", color:"white", fontFamily:"Avenir", fontSize:"18px"}}>
      <h5 style={{ color:"white"}}>Edit Profile</h5>
      </button>

      <Modal
        show={show}
        onHide={closingModalProfile}
        className={StyleEditProfil.background}>
          
        <Modal.Body>
          <div>
            <p className={StyleEditProfil.title}>Edit profil</p>
           
            <form className={StyleEditProfil.editProfilForm}  onSubmit={handleSubmit}>
            {message && message}
              <div className="form-group">
           
                <input
                  id="fullName"
                  name="fullName"
                  onChange={handleChange}
                  className={StyleEditProfil.inputField}
                  value={form.fullName}
                  type="text"
                  placeholder="fullName"
                  
                />
           
              </div>
              <div className="form-group">
                <input
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  className={StyleEditProfil.inputField}
                  placeholder="phone"
                  value={form.phone}
                  required
                />
              </div>

              <div className="form-group">
              <input
                  id="gender"
                  name="gender"
                  onChange={handleChange}
                  className={StyleEditProfil.inputField}
                  placeholder="male/female"
                  value={form.gender}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  id="address"
                  name="address"
                  onChange={handleChange}
                  className={StyleEditProfil.inputField}
                  placeholder="address"
                  value={form.address}
                  required
                />
              </div>

              <div className="form-group">
           
              {preview && (
              <div>
              <img
                src={preview}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                  marginBottom: "10px",
                  marginTop:"10px" }}
                alt="preview"/>
              </div>
              )}
              </div>

              <label htmlFor="file"  className={StyleEditProfil.inputFieldImage} >
                  <input
                    name="image"
                    type="file"
                    hidden
                    id="file"
                    onChange={handleChange}
                  />
                Edit Profil Picture {" "}
                <img src={attachment} style={{width:"15px"}} alt="" />
              </label>

              <div className="form-group">
                <button className={StyleEditProfil.button} >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default EditProfil;