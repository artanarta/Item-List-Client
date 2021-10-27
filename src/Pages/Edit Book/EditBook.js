import styles from "./EditBook.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import { API } from "../../Config/api";
import { useState, useEffect } from "react";
import CardOwner from "../../Components/CardOwner/CardOwner";

const EditBook = () => {
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
    <div style={{backgroundColor: "#E5E5E5"}} > 
    <p ><Navbar/></p>
    <div className={styles.container}>  
      <h1 className={styles.title} style={{fontFamily:"times"}}>Edit Book</h1>
     
      <div className={styles.listBook}>
           {books?.map((item, index) => (
              <CardOwner item={item} key={index} getBooks={getBooks}/>
            ))}       
      </div>
                
    </div>
    </div>
  );
};

export default EditBook;