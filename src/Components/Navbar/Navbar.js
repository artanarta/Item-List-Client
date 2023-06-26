import { useState } from "react";
import OwnerDropdown from "../Modal/OwnerDropDown/OwnerDropDown";
import user from "../../Assets/Images/iconmenu.png";
import { Container } from 'react-bootstrap';
import styles from "./Navbar.module.css";

const Header = ({ header }) => {

  const [ownerDropdownShow, setOwnerDropdownShow] = useState(false);
  return (
    <Container>
      <div
        onClick={() => setOwnerDropdownShow(!ownerDropdownShow)}
        className="d-flex justify-content-end">
        <img src={user} alt="pic menu" className={styles.menu} />
      </div>
      <OwnerDropdown
        showDropdown={ownerDropdownShow}
        onHide={() => setOwnerDropdownShow(false)} />
    </Container >
  );
};

export default Header;
