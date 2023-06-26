import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./AddItem.module.css";
import attachment from "../../Assets/Images/attachment.png";
import addBookVector from "../../Assets/Images/addBookVector.png";
import { API } from "../../Config/api";
import ModalAlert from "../../Components/Modal/Popup/Popup";
import { useHistory } from "react-router-dom";

export default function AddItem() {
  //modal
  const [modalShow, setModalShow] = useState(false);
  const history = useHistory();
  const [redirectTimeout, setRedirectTimeout] = useState(null);

  useEffect(() => {
    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [redirectTimeout]);

  //add item
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    nama_barang: "",
    harga_beli: "",
    harga_jual: "",
    stok: "",
    image: "",
  });

  const isFormEmpty = !form.nama_barang || !form.harga_beli || !form.harga_jual || !form.stok || !form.image;

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("nama_barang", form.nama_barang);
      formData.set("harga_beli", form.harga_beli);
      formData.set("harga_jual", form.harga_jual);
      formData.set("stok", form.stok);
      formData.set("image", form.image);

      const response = await API.post("/item", formData, config);
      console.log(response);

      setModalShow(true);

      const timeout = setTimeout(() => {
        history.push("/list-item");
      }, 1500);

      setRedirectTimeout(timeout);
    } catch (error) {
      console.log(error);
    }
  };

  const validateFile = () => {
    if (!form.image) {
      return false;
    }

    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileSizeLimit = 100 * 1024; // 100 KB

    const fileExtension = form.image.name.split(".").pop().toLowerCase();
    const fileSize = form.image.size;

    if (!allowedExtensions.includes(fileExtension) || fileSize > fileSizeLimit) {
      return false;
    }

    return true;
  };

  const buttonStyle = isFormEmpty || !validateFile()
    ? { cursor: "not-allowed", backgroundColor: "lightgray" }
    : {};

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1 style={{ fontStyle: "normal", fontFamily: "Times New Roman" }}> Add Item</h1><br />
          <div className="form-group">
            <input
              name="nama_barang"
              type="text"
              className={styles.inputField}
              onChange={handleChange}
              placeholder="Nama Barang"
            />
          </div>
          <div className="form-group">
            <input
              name="harga_beli"
              type="number"
              onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="Harga Beli"
            />
          </div>
          <div className="form-group">
            <input
              name="harga_jual"
              type="number"
              onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="Harga Jual"
            />
          </div>
          <div className="form-group">
            <input
              name="stok"
              type="number"
              onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="Stok"
            />
          </div>
          <div className="form-group">
            {preview && (
              <div>
                <img
                  src={preview}
                  style={{
                    maxWidth: "29vh",
                    maxHeight: "29vh",
                    objectFit: "cover",
                    marginBottom: "18px",
                    borderRadius: "5px",
                  }}
                  alt="preview" />
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
            />
            Cover File {" "}
            <img src={attachment} style={{ width: "15px" }} alt="" />
          </label> <br />
          {!validateFile() && (
            <div style={{ color: "red", marginTop: '10px' }}>
              Please select a valid image file (jpg, jpeg, png) with a maximum size of 100 KB.
            </div>
          )}

          <div className="form-group">
            <button
              className={styles.button}
              style={buttonStyle}
              disabled={isFormEmpty || !validateFile()}
              onClick={() => {
                setModalShow(true);
              }}
            >
              Add Item {" "}
              <img src={addBookVector} style={{ width: "25px" }} alt="" />
            </button>
          </div>
        </form>

        <div >
        </div>
      </div>

      <ModalAlert
        show={modalShow}
        hide={() => setModalShow(false)}
        message="Add Item Data Finish"
        color="#29BD11"
      />

    </div >
  );
}
