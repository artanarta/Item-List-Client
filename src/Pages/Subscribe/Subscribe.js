import React, { useState, useContext } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Wow from "../../Assets/Images/WowSubs.png";
import attachment from  "../../Assets/Images/attachment.png";
import SubscribeStyle from "./Subscribe.module.css";
import ModalAlert from "../../Components/Modal/Popup/Popup";
import { API } from "../../Config/api";

const Subscribe = () => {

  //modal popup
  const [modalShow, setModalShow] = useState(false);

  //add Transaction
  const [preview, setPreview] = useState(null); 
  const [form, setForm] = useState({
    accountNumber: "",
    transferProof :"",
    remainingActive: 0,
    userStatus: "Not Active",
    paymentStatus: "Pending",
    
  });

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
      console.log(form);

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("accountNumber", form.accountNumber);
      formData.set("transferProof", form.transferProof);
      formData.set("remainingActive", form.remainingActive);
      formData.set("userStatus", form.userStatus);
      formData.set("paymentStatus", form.paymentStatus);

      const response = await API.post("/transaction", formData, config);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


  return (
      <div className="row" style={{ backgroundColor: "#E5E5E5"}}>
        <div className="col-md-2" >
          <Sidebar />
        </div>

        <div className="col-md-9" style={{ backgroundColor: "#E5E5E5",  marginBottom:"150px"}}>
          <div className={SubscribeStyle.center}  style={{marginTop:"100px", marginRight:"40px"}}>
             <p className={SubscribeStyle.Premium} style={{ fontFamily:"Times"}}>Premium</p>
             <p className={SubscribeStyle.PayNow} style={{fontFamily:"avenir", fontSize:"20px"}}> Pay now and access all the latest books from
                <img src={Wow} alt="" />
             </p>
             <p className={SubscribeStyle.numberWow} style={{fontFamily:"avenir", fontSize:"19px"}}>
                <img src={Wow} alt="" />: 0981312323
             </p>
          <form onSubmit={handleSubmit}>
             <div style={{marginBottom:"20px"}}>
             <input 
              name="accountNumber"
              type="text"
              onChange={handleChange}
              style={{backgroundColor:"rgba(188, 188, 188, 0.25)", borderWidth: "1px", width:"335px",
              borderColor:"#bcbcbc", borderStyle:"solid", padding:"5px", fontSize:"18px", borderRadius:"5px",
              fontFamily:"avenir"}} 
              placeholder="Input your account number"/>
             </div>
             <div>
             <label htmlFor="file" class="custom-file-upload" style={{ width:"335px", backgroundColor:"white"}}>
                  <p style={{color:"red", fontFamily:"avenir",  fontSize:"17px"}}> Attach Proof of Transfer {" "}
                  <img src={attachment} style={{width:"15px"}} alt="" /></p>
            
             {preview && (
              <div>
              <img
                src={preview}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                  marginBottom: "14px" }}
                alt="preview"/> 
              </div>
              )}

             <input
                   name="transferProof"
                   type="file"
                   hidden
                   id="file"
                   onChange={handleChange}/>
            </label>
             </div>
             <div >
               <button onClick={() => {
                  setModalShow(true);
                }}
                className="btn btn-danger btn-block" style={{width:"340px", marginTop:"35px", fontFamily:"avenir", fontSize:"19px"}}>
                Send</button>
             </div>
           </form>
        </div>
    
      </div>
      <ModalAlert
        show={modalShow}
        hide={() => setModalShow(false)}
        message="Thank you for subscribing to premium, your premium package will be active after our admin approves your transaction, thank you"
        color="#29BD11"
      />
      </div>
      
  );
};

export default Subscribe;