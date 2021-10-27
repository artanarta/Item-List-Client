import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./EditContentBook.module.css";
import attachment from  "../../Assets/Images/attachment.png";
import addBookVector from  "../../Assets/Images/addBookVector.png";
import { API } from "../../Config/api";
import { useParams, useHistory } from "react-router-dom";

import ModalAlert from "../../Components/Modal/Popup/Popup";

export default function EditContentBook() {
  const { id } = useParams();

  const getBook = async () => {
    //value
    try {
      const response = await API.get("/book/" + id);
      setForm({
        ...form,
        title: response.data.data.book.title ,
        publicationDate: response.data.data.book.publicationDate,
        pages : response.data.data.book.pages,
        author: response.data.data.book.author,
        isbn: response.data.data.book.isbn,
        about: response.data.data.book.about
      });
    } catch (error) {
      console.log(error);
    }
  };

  //modal
  const [modalShow, setModalShow] = useState(false);

  //edit book
  let history = useHistory();
  const [preview, setPreview] = useState(null); 
  const [form, setForm] = useState({
    title: "",
    publicationDate: "",
    pages: "",
    author: "",
    isbn: "",
    about:"",
    image : "",
    bookFile :""
    
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleChangeBookFile = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(form);

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("publicationDate", form.publicationDate);
      formData.set("pages", form.pages);
      formData.set("author", form.author);
      formData.set("isbn", form.isbn);
      formData.set("about", form.about);
      formData.set("image", form.image);
      formData.set("bookFile", form.bookFile);

      const response = await API.patch("/book/" + id, formData, config);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();

  }, []);

    return (
        <div style={{backgroundColor: "#E5E5E5"}} > 
        <p ><Navbar/></p>

        <div className={styles.container} style={{backgroundColor: "#E5E5E5"}}>  
      
        <form className={styles.Form}  onSubmit={handleSubmit}>
        <h1 style={{fontStyle:"normal", fontFamily:"Times New Roman"}}> Edit Book</h1><br/>
              <div className="form-group">
                <input
                  name="title"
                  type="text"
                  className={styles.inputField}
                  onChange={handleChange}
                  value={form.title}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  name="publicationDate"
                  type="text"
                  onChange={handleChange}
                  className={styles.inputField}
                  value={form.publicationDate}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  name="pages"
                  onChange={handleChange}
                  className={styles.inputField}
                  value={form.pages}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  name="author"
                  onChange={handleChange}
                  className={styles.inputField}
                  placeholder="Author"
                  value={form.author}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  name="isbn"
                  onChange={handleChange}
                  className={styles.inputField}
                  placeholder="ISBN"
                  value={form.isbn}
                  required
                />
              </div>
              <div className="form-group">
                < textarea
                  type="area"
                  onChange={handleChange}
                  name="about"
                  className={styles.textarea}
                  placeholder="About This Book"
                  value={form.about}
                  required
                />
              </div>
              <div className="form-group">
           
              {preview && (
              <div>
              <img
                src={preview}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                  marginBottom: "18px" }}
                alt="preview"/>
              </div>
              )}
        </div>

              <label htmlFor="file">
                  <input
                    name="image"
                    type="file"
                    hidden
                    id="file"
                    onChange={handleChange}
                    required
                  />
                Cover File {" "}
                <img src={attachment} style={{width:"15px"}} alt="" />
              </label> <br/><br/>

              <label >
                 <input
                    name="bookFile"
                    type="file"
                    id="file"
                    hidden
                    onChange={handleChangeBookFile}/>
                  Book File {" "}
              <img src={attachment} style={{width:"15px"}} alt="" />
              </label >
       

              <div className="form-group">
                <button className={styles.button} onClick={() => {
                 setModalShow(true);
                }}>
                 Edit Book {" "}
                 <img src={addBookVector} style={{width:"25px"}} alt="" />
                </button>
              </div>
            </form>

        <div >
        </div>

        </div>
        <ModalAlert
        show={modalShow}
        hide={() => setModalShow(false)}
        message="Edit Book Data Finish"
        color="#29BD11"
      />
        </div>
    )
}
