import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Frame from "../../Assets/Images/Frame 1.png";
import Card from "../../Components/Card/Card";
import {  useState, useEffect } from "react";
import { API } from "../../Config/api";
import HomeStyle from "./Home.module.css";
// import buku from  "../../Data/buku";
// import { UserContext } from "../../Context/userContext";
// import { useContext, useState } from "react";
// import { useHistory } from "react-router-dom";
// import Masonry from "react-masonry-css";
// import { Col } from "react-bootstrap";
// import imgEmpty from "../../Assets/Images/empty.svg";

const Home = () => {

   // Variabel for store product data
  const [books, setBooks] = useState([]);
  console.log(books, "List book")

  // Get product data from database
  const getBooks = async () => {
    try {
      const response = await API.get("/books");
      // Store product data to useState variabel
      setBooks(response.data.data.books);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="App-header" style={{ backgroundColor: "#E5E5E5"}}>
      <div className="row">
        <div className="col-sm-2" >
          <Sidebar /> 
          </div>
          <div className="col-md-10">
          <img  src={Frame} alt="Frame"  />
          <p className={HomeStyle.bookheader} style={{fontFamily:"Times New Roman"}}>List Book</p>
          <div>
            <div className={HomeStyle.listBook}>
              {books?.map((item, index) => (
                  <Card item={item} key={index} />
                ))}
               
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;