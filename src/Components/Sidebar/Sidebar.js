import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import profilePic from "../../Assets/Images/Ellipse 1.png";
import user1 from "../../Assets/Images/user 1.png";
import subs from "../../Assets/Images/bill 1.png";
import wow from "../../Assets/Images/Icon.png";
import logout from "../../Assets/Images/logout 1.png";
import SidebarStyle from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import {API} from "../../Config/api"

const Sidebar = () => {

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT'
    });
  };

  const [ state , dispatch] = useContext(UserContext);

  const [data, setData] = useState(null);

  let isSubscribe = false;

  const getUser = async () => {
    try {
      const response = await API.get("/user/" + state.user.id);
      setData(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  if (data?.trans.length === 0) {
    isSubscribe = false;
  } else if (data?.trans[0].userStatus === "Active") {
    isSubscribe = true;
  } else {
    isSubscribe = false;
  }

  useEffect(() => {
    getUser();
  }, []);



  return (
    <Nav  style={{marginLeft:"45px"}} >
      <Nav.Item>
      <Link to="/home">
        <img
          className={SidebarStyle.wow}
          src={wow}
          alt="wow"
        /></Link>
      </Nav.Item>
      <Nav.Item>
        <img   className={SidebarStyle.profilPic} src={profilePic} alt="" />
        <p className={SidebarStyle.username} >{state.user.fullName}</p>
      </Nav.Item>
      <Nav.Item>
           {isSubscribe? (
              <span className="text-success fw-bold fs-6" style={{marginLeft:"15px"}}>Subscribed</span>
            ) : (
              <span className="text-danger fw-bold fs-6" >Not Subscribed</span>
            )}
      </Nav.Item>
      <hr />
   
      <Nav.Item >
        <Nav.Link to="/profile" as={Link} style={{display:"flex"}}>
        <img src={user1} alt="user1" style={{height:"21px", marginRight:"6px"}} />
          <p className={SidebarStyle.menus}  style={{marginBottom:"10px"}}>Profile</p>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/subs" as={Link} style={{display:"flex"}}>
        <img src={subs} alt="subs"  style={{height:"21px", marginRight:"6px"}} />
          <p className={SidebarStyle.menus}>Subscribe</p>
        </Nav.Link>
      </Nav.Item>
      <hr />
      <Nav.Item>
        <Nav.Link to="/" as={Link}  style={{display:"flex"}}>
        <img src={logout} alt="logout"  style={{height:"21px", marginRight:"6px"}} />
        <p  onClick={handleLogout} className={SidebarStyle.menus} >Logout</p>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
export default Sidebar;