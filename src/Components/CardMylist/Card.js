import React from "react";
import CardStyle from "./Card.module.css";
import { useHistory } from "react-router-dom";

const Card = ({ item, index  }) => {

  const history = useHistory();

  return (
    <div key={index} >   
      <img
         src={`http://localhost:5000/uploads/${item.book.image}`}
         className={CardStyle.image}
         alt="image"
         onClick={() => {history.push("/detail/" + item.book.id)}}/>
      <p className={CardStyle.title}>{item.book.title}</p>
      <p className={CardStyle.writer}>{item.book.author}</p>
    </div>
  );
};

export default Card;