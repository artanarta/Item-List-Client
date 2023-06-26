import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./EditItem.module.css";
import attachment from "../../Assets/Images/attachment.png";
import addBookVector from "../../Assets/Images/addBookVector.png";
import { API } from "../../Config/api";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import ModalAlert from "../../Components/Modal/Popup/Popup";

export default function EditItem() {
  const { id } = useParams();
  const history = useHistory();

  const getitem = async () => {
    //value
    try {
      const response = await API.get("/item/" + id);
      setForm({
        ...form,
        nama_barang: response.data.data.item.nama_barang,
        harga_beli: response.data.data.item.harga_beli,
        harga_jual: response.data.data.item.harga_jual,
        stok: response.data.data.item.stok,
        image: response.data.data.item.image
      });
      setPreview('http://localhost:5000/uploads/' + response.data.data.item.image); // Menampilkan pratinjau gambar
      console.log('http://localhost:5000/uploads/' + response.data.data.item.image, 'response')
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getitem();
  }, []);

  //modal
  const [modalShow, setModalShow] = useState(false);

  //edit item
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    nama_barang: "",
    harga_beli: "",
    harga_jual: "",
    stok: "",
    image: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleChange = (e) => {
    setErrorMessage(""); // Reset error message

    if (e.target.type === "file") {
      const file = e.target.files[0];
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const allowedSize = 100 * 1024; // 100 KB

      if (!file) {
        setErrorMessage("Please select an image file");
        setIsButtonDisabled(true);
        return;
      }

      const fileExtension = file.name.split(".").pop().toLowerCase();
      const fileSize = file.size;

      if (!allowedExtensions.includes(fileExtension) || fileSize > allowedSize) {
        setErrorMessage(
          "Please select a valid image file (jpg, jpeg, png) with a maximum size of 100 KB"
        );
        setIsButtonDisabled(true);
        return;
      }

      let url = URL.createObjectURL(file);
      setPreview(url);
      setForm({ ...form, image: file });
      setIsButtonDisabled(false);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
      setIsButtonDisabled(false);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Check if file is selected
      if (!form.image) {
        setErrorMessage("Please select an image file");
        setIsButtonDisabled(true);
        return;
      }

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

      const response = await API.patch("/item/" + id, formData, config);
      console.log(response);

      // Show success modal
      setModalShow(true);

      // Redirect to list item after 1.5 seconds
      setTimeout(() => {
        setModalShow(false);
        history.push("/list-item");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1 style={{ fontStyle: "normal", fontFamily: "Times New Roman" }}>
            Edit item
          </h1>
          <br />
          <div className="form-group">
            <input
              name="nama_barang"
              type="text"
              className={styles.inputField}
              onChange={handleChange}
              value={form.nama_barang}
              required
            />
          </div>
          <div className="form-group">
            <input
              name="harga_beli"
              type="text"
              onChange={handleChange}
              className={styles.inputField}
              value={form.harga_beli}
              required
            />
          </div>
          <div className="form-group">
            <input
              name="harga_jual"
              onChange={handleChange}
              className={styles.inputField}
              value={form.harga_jual}
              required
            />
          </div>
          <div className="form-group">
            <input
              name="stok"
              onChange={handleChange}
              className={styles.inputField}
              placeholder="stok"
              value={form.stok}
              required
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
                  alt="preview"
                />
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
            Cover File{" "}
            <img src={attachment} style={{ width: "15px" }} alt="" />
          </label>{" "}
          <br />
          <br />

          {errorMessage && (
            <p style={{ color: "red" }}>{errorMessage}</p>
          )}

          <div className="form-group">
            <button
              className={styles.button}
              onClick={() => {
                setModalShow(true);
              }}
              disabled={isButtonDisabled}
              style={{ backgroundColor: isButtonDisabled ? "gray" : "" }}
            >
              Edit item{" "}
              <img src={addBookVector} style={{ width: "25px" }} alt="" />
            </button>
          </div>
        </form>

        <div></div>
      </div>
      <ModalAlert
        show={modalShow}
        hide={() => setModalShow(false)}
        message="Edit Item Data Finish"
        color="#29BD11"
      />
    </div>
  );
}
