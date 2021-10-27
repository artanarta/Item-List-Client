import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
} from "react-bootstrap";
import {  useState } from "react";
import wow from "../../Assets/Images/Icon.png";
import OwnerDropdown from "../Modal/OwnerDropDown/OwnerDropDown";
import user from "../../Assets/Images/Ellipse 1.png";

const Header = ({ header }) => {

  const [ownerDropdownShow, setOwnerDropdownShow] = useState(false);
  return (
    <Navbar expand="lg">
      <Link to="/owner" style={{marginLeft:"40px"}}>
        <img src={wow} alt="wow" />
      </Link>
      
      <Nav className="mr-auto">
      <div
      onClick={() => setOwnerDropdownShow(!ownerDropdownShow)}>
      <img src={user} alt="" height="70px" style={{marginLeft:"990px"}} />
      </div>
      <OwnerDropdown
      showDropdown={ownerDropdownShow}
      onHide={() => setOwnerDropdownShow(false)}/>
      </Nav>
    </Navbar>
  );
};

export default Header;
