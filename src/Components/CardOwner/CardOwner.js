import React, { useState, useEffect } from "react";
import CardStyle from "./CardOwner.module.css";
import { useHistory, useParams } from "react-router-dom";
import { API } from "../../Config/api";
import { Modal, Button } from "react-bootstrap";
import styles from "./DetailItem.module.css";
import ModalAlert from "../../Components/Modal/Popup/Popup";

const CardOwner = ({ item, index, getitems }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [form, setForm] = useState({
    nama_barang: "",
    harga_beli: "",
    harga_jual: "",
    stok: "",
    image: "",
  });
  const history = useHistory();
  const { id } = useParams();

  const handleDeleteItem = async () => {
    try {
      await API.delete("/item/" + item.id);
      getitems();
    } catch (error) {
      console.log(error);
    }
  };

  const getitem = async () => {
    try {
      const response = await API.get("/item/" + id);
      setForm({
        ...form,
        nama_barang: response.data.data.item.nama_barang,
        harga_beli: response.data.data.item.harga_beli,
        harga_jual: response.data.data.item.harga_jual,
        stok: response.data.data.item.stok,
        image: response.data.data.item.image,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openDetailModal = () => {
    setIsDetailModalOpen(true);
    setForm({
      nama_barang: item.nama_barang,
      harga_beli: item.harga_beli,
      harga_jual: item.harga_jual,
      stok: item.stok,
      image: item.image,
    });
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    getitem();
  }, []);

  const handleDeleteConfirmation = () => {
    setIsDeleteModalOpen(false);
    handleDeleteItem();
  };

  return (
    <div key={index}>
      <img src={item.image} className={CardStyle.image} alt="img" onClick={openDetailModal} />
      <p className={CardStyle.title}>{item.nama_barang}</p>
      <p className={CardStyle.stok}>Stok : {item.stok}</p>
      <div className="d-flex justify-content-between">
        <button className={CardStyle.button} onClick={() => history.push("/item/" + item.id)}>
          Edit
        </button>
        <button className={CardStyle.button2} onClick={openDeleteModal}>
          Delete
        </button>
      </div >

      {/* Modal for delete confirmation */}
      <Modal show={isDeleteModalOpen} onHide={closeDeleteModal} centered>
        <Modal.Body>
          <h5>Are you sure to delete this data?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteConfirmation}>
            Yes
          </Button>
          <Button variant="secondary" onClick={closeDeleteModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End of modal for delete confirmation */}

      {/* Modal for detail data */}
      <Modal show={isDetailModalOpen} onHide={closeDetailModal} centered>
        <Modal.Body>
          <div>
            <div className={styles.container}>
              <form>
                <h1 style={{ fontFamily: "SF Pro Text", textAlign: "center" }}>
                  Detail item
                </h1>
                <br />
                <div className="form-group">
                  <h5 className={styles.fontFamilySF} >Nama Barang </h5>
                  <input
                    name="nama_barang"
                    type="text"
                    className={styles.inputField}
                    readOnly
                    value={form.nama_barang}
                    required
                  />
                </div>
                <div className="form-group">
                  <h5 className={styles.fontFamilySF}>Harga Beli </h5>
                  <input
                    name="harga_beli"
                    type="text"
                    readOnly
                    className={styles.inputField}
                    value={form.harga_beli}
                    required
                  />
                </div>
                <div className="form-group">
                  <h5 className={styles.fontFamilySF}>Harga Jual </h5>
                  <input
                    name="harga_jual"
                    readOnly
                    className={styles.inputField}
                    value={form.harga_jual}
                    required
                  />
                </div>
                <div className="form-group">
                  <h5 className={styles.fontFamilySF}>Stok </h5>
                  <input
                    name="stok"
                    readOnly
                    className={styles.inputField}
                    placeholder="stok"
                    value={form.stok}
                    required
                  />
                </div>
              </form>
            </div>
            <ModalAlert
              show={modalShow}
              hide={() => setModalShow(false)}
              message="Edit Item Data Finish"
              color="#29BD11"
            />
          </div>
        </Modal.Body>
      </Modal>
      {/* End of modal for detail data */}
    </div>
  );
};

export default CardOwner;
