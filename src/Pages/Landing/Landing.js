import React from "react";
import Background from "../../Assets/Images/Background.png";
import Wow from "../../Assets/Images/Wow.png";
import Signin from "../../Components/Modal/Sign in/Signin";
import SignUp from "../../Components/Modal/Sign up/Signup";
import landingStyle from "./Landing.module.css";

function Landing() {
  return (
    <div className={landingStyle.background} style={{ backgroundImage: `url(${Background})` }}>
      <div className="col-md-6 ">
        <div className={landingStyle.landingContent}>
          <img src={Wow} alt="pic" style={{ width :'350px', height :'200px', marginTop:'25px' }}/>
          <h5><p className={landingStyle.landingText} style={{fontFamily:"avenir"}}>
            Sign-up now and subscribe to enjoy all the cool and
            latest books - The best book rental service provider in Indonesia
          </p></h5>
          <div className={landingStyle.button}>
            <p style={{ marginRight: "10px", fontFamily:"avenir"}}> <SignUp /> </p>
            <p style={{ marginLeft: "10px", fontFamily:"avenir"}}> <Signin /> </p>
          </div>
        </div>
        </div>
    </div>
  );
};

export default Landing;