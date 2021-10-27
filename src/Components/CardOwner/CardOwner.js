import React, { useContext,useState,useEffect } from "react";
import CardStyle from "./CardOwner.module.css";
import { useHistory } from "react-router-dom";
import { API} from "../../Config/api";

const CardOwner = ({ item, index,getBooks }) => {
  const history = useHistory();
  const handleDeleteBook = async () => {
    try {
      await API.delete("/book/" + item.id);
      getBooks();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div key={index} >   
      <img src={item.image} className={CardStyle.image} alt="img" />
      <p className={CardStyle.title}>{item.title}</p>
      <p className={CardStyle.writer}>{item.author}</p>
      <button className={CardStyle.button} 
       onClick={() => {history.push("/editContentBook/" + item.id)}} >Edit</button>
      <button className={CardStyle.button2} style={{marginLeft:"65px"}}  
       onClick={() => handleDeleteBook(item.id)}>Delete</button>
    </div>
  );
};

export default CardOwner;