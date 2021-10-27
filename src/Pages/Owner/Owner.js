import styles from "./Owner.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import { API } from "../../Config/api";
import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";

const Owner = () => {
  const [transactions, setTransactions] = useState([]);

  const getTransaction = async () => {
    try {
      const response = await API.get("/transactions");
      setTransactions(response.data.data.transactions);
    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  const approved = async (id) => {
    try {
      const approveData = JSON.stringify({
        remainingActive: 30,
        userStatus: "Active",
        paymentStatus: "Approved",
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await API.patch(`transaction/${id}`, approveData, config);

      getTransaction();

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const cancel = async (id) => {
    try {
      const cancelData = JSON.stringify({
        remainingActive: 0,
        userStatus: "Not Active",
        paymentStatus: "Cancel",
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await API.patch(`transaction/${id}`, cancelData, config);

      getTransaction();

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{backgroundColor: "#E5E5E5"}} > 
    <p ><Navbar/></p>
    <div className={styles.container}>  
      <h1 className={styles.title} style={{fontFamily:"times"}}>Income Transaction</h1>
      <table className={styles.incomeTable}>
    
        <tr>
         
          <th className={styles.red}>Users</th>
          <th className={styles.red}>Bukti Transfer</th>
          <th className={styles.red}>Remaining Active</th>
          <th className={styles.red}>Status User</th>
          <th className={styles.red}>Status Payment</th>
          <th className={styles.red}> Action</th>
        </tr>
    
          
        {transactions.length > 0 ? (
           transactions.map((transaction, index) => {
              return ( 
                 <tr key={index}> 
              
                 <td>{transaction.user.fullName}</td>
                 <td><a href={transaction.transferProof}>
                 <img className="attachment" src={transaction.transferProof} style={{width:"65px", height:"55px"}}
                  alt="attachment" /></a></td>
                 <td>{transaction.remainingActive} / Hari</td>
                 <td className={styles.active}>{transaction.userStatus}</td>
                 <td className={styles.pending}>{transaction.paymentStatus}</td>
                 <td > 
                 
                 <Dropdown>
                   <Dropdown.Toggle className={styles.dropdownToogle} >
           
                   </Dropdown.Toggle>

                <Dropdown.Menu className={styles.dropdownAction} >
                   <Dropdown.Item className="text-success fw-bold"  onClick={() => approved(transaction.id)}> Approved</Dropdown.Item>
                   <Dropdown.Item className="text-danger fw-bold" onClick={() => cancel(transaction.id)}>Cancel</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
                 
                 </td>
                 </tr>
               ); 
            }) 
          ) : ( 
            <tr>
             <td colSpan="5" style={{ textAlign: "center" }}>
                Belum ada data
              </td>
            </tr>
          )} 
        
    
      </table>
    </div>
    </div>
  );
};

export default Owner;