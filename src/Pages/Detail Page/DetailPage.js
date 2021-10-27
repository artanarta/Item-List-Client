import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import addmylist from  "../../Assets/Images/addmylist.png";
import DetailStyles from "./DetailPage.module.css";
import { UserContext } from "../../Context/userContext";
import { API } from "../../Config/api";

const DetailPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [state ] = useContext(UserContext);
  const [book, setBook] = useState([]);
  const [listBook, setlistBook] = useState([]);
  const [doneAddList, setDoneAddList] = useState(false);

  const checkMyList = async () => {
    try {
      const listBook  = await API.get("/bookList/" + state.user.id);
      const checkListBook = listBook.data.data.bookList.filter((data) => 
      {
        return data.book.id == id
      });
      checkListBook.length == 0 ? setDoneAddList(false) : setDoneAddList(true);
      console.log(checkListBook, 'checkListBook');
    } catch (error) {
      console.log(error);
    }
  };

  const getBook = async () => {
    try {
      const response = await API.get("/book/" + id);
      setBook(response.data.data.book);
    } catch (error) {
      console.log(error);
    }
  };

  const addMyList = async () => {
    try {
      const body = {
        bookId: id,
      };
      const res = await API.post("/bookList", body);
      setlistBook(res.data.data.listBook);
      console.log(listBook, "listbook");
    } catch (error) {
      console.log(error);
    }

    history.push("/profile");
  };

  useEffect(() => {
    getBook();
    checkMyList();
  }, []);

  return (
        <div className="row" style={{ backgroundColor: "#E5E5E5"}}>
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <div style={{marginTop:"40px", marginLeft:"40px"}}>
            <div className="row" >
              <div className="col-md-3">
                <img className={DetailStyles.detailImage} src={book?.image} alt="" />
              </div>
              <div className="col-md-8"  style={{marginLeft:"50px"}}>
                <p className={DetailStyles.title}>{book?.title}</p>
                <p className={DetailStyles.writer}>{book?.author}</p>
                <p className={DetailStyles.upper}>Publication Date</p>
                <p className={DetailStyles.lower}>{book?.publicationDate}</p>
                <p className={DetailStyles.upper}>Pages</p>
                <p className={DetailStyles.lower}>{book?.Pages}</p>
                <p className={DetailStyles.upper} style={{color:"red"}}>ISBN</p>
                <p className={DetailStyles.lower}>{book?.isbn}</p>
              </div>
            </div>
            <div style={{marginTop:"50px"}}>
              <p className={DetailStyles.titleAbout} >About This Book</p>
              <p className={DetailStyles.textAbout}>{book?.about}</p>
            </div>
            <div className="row">
            <div className="col-md-8"> </div>
              
            <>
            <div className="col-md-2">
              {doneAddList? [null] : (
              <button
                className={DetailStyles.button}
                  style={{ height:"50px"}}
                  onClick={addMyList}>
                 Add my list {" "}  <img src={addmylist} style={{width:"15px"}} alt="" />
                </button>
              )}
       
              </div> 
              </>
             
              <div style={{marginBottom: '20px'}} className="col-md-2">
                <button
                  className="btn btn-secondary"
                  style={{ height:"50px", fontFamily:"avenir"}}
                  onClick={() => history.push("/read/" + id)}>
                  Read Book  {">"} 
                </button>
              </div>
            </div>
           </div>
          </div>
        </div>
  );
};

export default DetailPage;