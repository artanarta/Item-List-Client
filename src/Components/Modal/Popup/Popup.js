import React from "react";
import { Modal } from "react-bootstrap";
import popupstyle from "./Popup.module.css";

export default function Popup(props) {
  const { show, hide, message, color } = props;

  return (
    <div>
      <Modal show={show} onHide={hide} top style={{marginLeft:"28px"}}>
        <div className={popupstyle.textPadding}>
          <p style={{ paddingTop:"10px", textAlign: "center", fontSize: "20px", color: `${color}` }}>
            {message}
          </p>
        </div>
      </Modal>
    </div>
  );
}