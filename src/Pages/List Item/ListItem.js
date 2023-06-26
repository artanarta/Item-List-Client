import styles from "./ListItem.module.css";
import { API } from "../../Config/api";
import { useState, useEffect } from "react";
import CardOwner from "../../Components/CardOwner/CardOwner";
import { Container, Pagination, Form } from "react-bootstrap";
import emptyMyList from "../../Assets/Images/emptylistowner.png";

import OwnerDropdown from "../../Components/Modal/OwnerDropDown/OwnerDropDown"
import user from "../../Assets/Images/iconmenu.png";


const ListItem = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");

  // Get product data from database
  const getItems = async () => {
    try {
      const response = await API.get("/items");
      setItems(response.data.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredItems = items.filter((item) =>
    item.nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderedItems = searchQuery ? filteredItems : currentItems;
  const [ownerDropdownShow, setOwnerDropdownShow] = useState(false);

  return (
    <div>
      <Container>
        <div className="d-flex justify-content-between" style={{ marginTop: '40px' }}>
          <h1 className={styles.title} style={{ fontFamily: "times" }}>
            List item
          </h1>

          <div
            onClick={() => setOwnerDropdownShow(!ownerDropdownShow)}
            className="d-flex justify-content-end">
            <img src={user} alt="pic menu" className={styles.menu} />
          </div>
          <OwnerDropdown
            showDropdown={ownerDropdownShow}
            onHide={() => setOwnerDropdownShow(false)} />
        </div>

        <div className={styles.searchContainer}>
          <Form.Control
            type="text"
            placeholder="Search item here..."
            value={searchQuery}
            onChange={handleSearch}
            style={{ fontFamily: "SF Pro Text" }}
          />
        </div>

        <div className={styles.listItem}>
          {renderedItems && renderedItems.length > 0 ? (
            <div className={styles.listItem}>
              {renderedItems.map((item, index) => (
                <CardOwner item={item} key={index} getitems={getItems} />
              ))}
            </div>
          ) : (
            <div className={styles.formLanding}>
              <img src={emptyMyList} className={styles.oopsImage} alt="not found" />
              <br />
              <br />
              <div className={styles.oopstext}> Ooops... There is no data here....</div>
            </div>
          )}
        </div>

        <div className={styles.paginationContainer}>
          <Pagination>
            {items.length > itemsPerPage && (
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              />
            )}

            {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}

            {items.length > itemsPerPage && (
              <Pagination.Next
                disabled={currentPage === Math.ceil(items.length / itemsPerPage)}
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            )}
          </Pagination>
        </div>
      </Container>
    </div>
  );
};

export default ListItem;
