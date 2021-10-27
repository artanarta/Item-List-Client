import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams  } from "react-router-dom";
import ReadBookStyle from "./ReadBook.module.css";
import { API } from "../../Config/api";
import { ReactReader } from "react-reader";
import logoPic from "../../Assets/Images/Icon.png";

export default function ReadBook() {
  const [location, setLocation] = useState(null);
  const locationChanged = (epubcifi) => {
    setLocation(epubcifi);
  };

  const history = useHistory();
  const { id } = useParams();
  
  console.log(location);
  console.log(locationChanged)

  const [book, setBook] = useState([]);
  console.log(book);

  const getBook = async () => {
    try {
      const response = await API.get("/book/" + id);
      setBook(response.data.data.book);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  console.log(book);


  const goToHome = () => {
    history.push(`/home`);
  };

  return (
     <div className={ReadBookStyle.background} >
        <img
            className={ReadBookStyle.wow}
            src={logoPic}
            alt=""
            onClick={() => goToHome()}
        />
     <div className={ReadBookStyle.ReactReader} >
        <ReactReader
          location={location}
          locationChanged={locationChanged}
          url={book?.bookFile} />
     </div>
     </div>
  );
};
