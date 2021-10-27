import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import CardStyle from "./Card.module.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import {API} from "../../Config/api"
import ModalAlert from "../../Components/Modal/Popup/Popup";

const Card = ({ item, index  }) => {

  const [modalShow, setModalShow] = useState(false);

  const history = useHistory();

  const [data, setData] = useState(null);
  const [ state , dispatch] = useContext(UserContext);

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

  const handleMyList = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div key={index} >   
      <img src={item.image} alt="img" 
          className={CardStyle.image}
          onClick={
            !isSubscribe ? handleMyList : () => 
            {
              history.push("/detail/" + item.id)
            }
      }/> 
      <p className={CardStyle.title}>{item.title}</p>
      <p className={CardStyle.writer}>{item.author}</p>

      <ModalAlert
        show={modalShow}
        hide={() => setModalShow(false)}
        message="  Please make a payment to read the latest book"
        color="red"
      />
    </div>
  );
};

export default Card;