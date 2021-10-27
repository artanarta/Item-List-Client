import styles from "./OwnerDropDown.module.css";
import book from "../../../Assets/Images/addBook.png";
import logout from "../../../Assets/Images/logout 2.png";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../Context/userContext";
import { useContext }  from "react";

const OwnerDropdown  = ({ showDropdown, onHide }) => {
  const router = useHistory();

  const [state,  dispatch] = useContext(UserContext);
  console.log(state);

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT'
    });
    router.push("/");
    onHide();
  };

  return (
    showDropdown && (
      <>
        <div className={styles.dropdownWrapper}>
          <div
            className={styles.dropdownMenuWrapper}
            onClick={() => {
              router.push("/addBook");
              onHide();
            }}
          >
            <img
              className={styles.menuIcon}
              src={book}
              alt="user icon"
              width="35px"
            />
            <p className={styles.menuText} >Add Book</p>
          </div> 

          <div
            className={styles.dropdownMenuWrapper}
            onClick={() => {
              router.push("/editBook");
              onHide();
            }}
          >
            <img
              className={styles.menuIcon}
              src={book}
              alt="user icon"
              width="35px"
            />
            <p className={styles.menuText} >My Book</p>
          </div> 
          <p className={styles.divider}></p>
          
          <div
            className={styles.dropdownMenuWrapper}
            onClick={handleLogout}
          >
            <img
              className={styles.menuIcon}
              src={logout}
              alt="user icon"
              width="35px"
            />
            <p className={styles.menuText} >Logout</p>
          </div>

         
        </div>
        <div className={styles.background} onClick={onHide}></div>
      </>
    )
  );
};
export default OwnerDropdown;