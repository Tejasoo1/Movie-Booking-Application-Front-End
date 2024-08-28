import Axios from "axios";
import { locationDetails } from "../data/ServerData";
import styles from "./AdminPanel.module.css";
import Navbar from "./Navbar";
import { useState } from "react";

function AdminPanel() {
  const [isCreated, setIscreated] = useState(false);

  function handleServerData() {
    Axios.post(
      "https://movies-booking-application-back-end.onrender.com/create/locationsandtheaters",
      {
        details: locationDetails,
      },
    ).then((res) => {
      console.log(res.data);
      setIscreated(true);
    });

    // Axios.post("http://localhost:5000/create/locationsandtheaters", {
    //   details: locationDetails,
    // }).then((res) => {
    //   console.log(res.data);
    //   setIscreated(true);
    // });
  }

  return (
    <>
      <Navbar />
      <div className={styles.PanelContainer}>
        <button
          disabled={isCreated}
          className={styles.Panelbtn}
          onClick={handleServerData}
        >
          Insert Locations And Theaters Info in backend server.
        </button>
      </div>
    </>
  );
}

export default AdminPanel;
