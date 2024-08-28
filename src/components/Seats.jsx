import { useEffect, useState } from "react";
import styles from "./Seats.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBookedMovie,
  updateSeatObjs,
  updateSeatsPageData,
  updateTotalCost,
  updateTotalTickets,
  updateUpdatedRows,
} from "./seatsSlice";
import { useNavigate } from "react-router-dom";

//Seating Arrangements data
const rows = [
  {
    section: "Rs. 550 Premium",
    seatsInfo: [
      {
        rowName: "M",
        seatNos: Array.from({ length: 11 }, (_, i) => ({
          category: "Rs. 550 Premium",
          rowName: "M",
          no: 11 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "L",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 550 Premium",
          rowName: "L",
          no: 20 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "K",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 550 Premium",
          rowName: "K",
          no: 20 - i,
          booked: false,
          soldOut: false,
        })),
      },
    ],
  },
  {
    section: "Rs. 350 EXECUTIVE",
    seatsInfo: [
      {
        rowName: "J",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 350 EXECUTIVE",
          rowName: "J",
          no: 20 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "I",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 350 EXECUTIVE",
          rowName: "I",
          no: 20 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "H",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 350 EXECUTIVE",
          rowName: "H",
          no: 20 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "G",
        seatNos: Array.from({ length: 24 }, (_, i) => ({
          category: "Rs. 350 EXECUTIVE",
          rowName: "G",
          no: 24 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "F",
        seatNos: Array.from({ length: 24 }, (_, i) => ({
          category: "Rs. 350 EXECUTIVE",
          rowName: "F",
          no: 24 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "E",
        seatNos: Array.from({ length: 24 }, (_, i) => ({
          category: "Rs. 350 EXECUTIVE",
          rowName: "E",
          no: 24 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "D",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 350 EXECUTIVE",
          rowName: "D",
          no: 20 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "C",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 350 EXECUTIVE",
          rowName: "C",
          no: 20 - i,
          booked: false,
          soldOut: true,
        })),
      },
    ],
  },
  {
    section: "Rs. 350 Normal",
    seatsInfo: [
      {
        rowName: "B",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 350 Normal",
          rowName: "B",
          no: 20 - i,
          booked: false,
          soldOut: false,
        })),
      },
      {
        rowName: "A",
        seatNos: Array.from({ length: 20 }, (_, i) => ({
          category: "Rs. 350 Normal",
          rowName: "A",
          no: 20 - i,
          booked: false,
          soldOut: false,
        })),
      },
    ],
  },
];

let ticketsCount = 0;

//Helper function
const getRowsForShow = (locationDetails, location, theaterName, date, time) => {
  // Step 1: Find the location object
  const locationObj = locationDetails.find((loc) => loc.location === location);

  if (!locationObj) {
    console.log("Location not found");
    return null;
  }

  // Step 2: Find the theater object
  const theaterObj = locationObj.theaters.find(
    (theater) => theater.theaterName === theaterName,
  );

  if (!theaterObj) {
    console.log("Theater not found");
    return null;
  }

  // Step 3: Find the show date object
  const showDateObj = theaterObj.showDates.find(
    (showDate) => showDate.date === date,
  );

  if (!showDateObj) {
    console.log("Show date not found");
    return null;
  }

  // Step 4: Find the show time object and extract rows
  const showTimeObj = showDateObj.showTimes.find(
    (showTime) => showTime.time === time,
  );

  if (!showTimeObj) {
    console.log("Show time not found");
    return null;
  }

  return showTimeObj.rows;
};

function Seats() {
  console.log("Seats component");
  const [rowsCopy, setRowsCopy] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [seatObjects, setSeatObjects] = useState([]);

  // const seatsBookingData = useSelector((state) => state.seatsAndBookingInfo);
  // console.log({ seatsBookingData });

  console.log(rowsCopy);

  //For dispacting actions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Accessing local storage
  const parsedLocationsData =
    JSON.parse(localStorage.getItem("seatsPageInfo")) || {};

  const {
    NoOfSeats,
    selectedTime,
    selectedTheater,
    currLocation,
    locationsAndTheaters,
    selectedDate,
  } = useSelector((state) => state.locationAndTheater);

  const totalTickets = NoOfSeats ? NoOfSeats : parsedLocationsData.NoOfSeats;

  console.log(totalTickets);
  console.log({ totalCost });

  //Handling tickets to be booked
  function handleBookingSeats(currSeat) {
    //Guard Clause
    if (currSeat.soldOut === true || currSeat.booked === true) {
      return;
    }

    console.log(currSeat);
    setSeatObjects((seatObjects) => [...seatObjects, currSeat]);
    console.log({ ticketsCount });

    //Calculating total Cost
    const str = currSeat.category;
    const number = parseInt(str.match(/\d+/)[0], 10);

    console.log({ number });
    // Output: 550
    setTotalCost((totalCost) => totalCost + number);

    if (ticketsCount < totalTickets) {
      const particularSectionSeatsInfo = rowsCopy.find(
        (sec) => sec.section === currSeat.category,
      )?.seatsInfo;

      console.log({ particularSectionSeatsInfo });

      const updatedSeatsInfo = particularSectionSeatsInfo.map((seat) => {
        if (seat.rowName === currSeat.rowName) {
          console.log({ seat });
          const updatedSeatNos = seat.seatNos.map((selecSeat) =>
            selecSeat.no === currSeat.no
              ? { ...selecSeat, booked: true }
              : { ...selecSeat },
          );

          console.log({ updatedSeatNos });
          return { ...seat, seatNos: updatedSeatNos };
        } else {
          return { ...seat };
        }
      });

      console.log({ updatedSeatsInfo });

      const updatedRowCopy = rowsCopy.map((currRoe) =>
        currRoe.section === currSeat.category
          ? { ...currRoe, seatsInfo: updatedSeatsInfo }
          : { ...currRoe },
      );

      console.log({ updatedRowCopy });
      ticketsCount++;
      localStorage.setItem("countOfTickets", JSON.stringify(ticketsCount));

      setRowsCopy(updatedRowCopy);
    } else {
      console.log(`${totalTickets} tickets are already booked`);
      ticketsCount = 0; //reset the ticket count.
      setSeatObjects(() => [currSeat]);

      //Calculating total Cost
      const str = currSeat.category;
      const number = parseInt(str.match(/\d+/)[0], 10);

      console.log({ number });
      setTotalCost(number);

      //Copy the original rows Array
      let rowsCopied = rows;

      //Update the updatedRows Array.
      const particularSectionSeatsInfo = rowsCopied.find(
        (sec) => sec.section === currSeat.category,
      )?.seatsInfo;

      console.log({ particularSectionSeatsInfo });

      const updatedSeatsInfo = particularSectionSeatsInfo.map((seat) => {
        if (seat.rowName === currSeat.rowName) {
          console.log({ seat });
          const updatedSeatNos = seat.seatNos.map((selecSeat) =>
            selecSeat.no === currSeat.no
              ? { ...selecSeat, booked: true }
              : { ...selecSeat },
          );

          console.log({ updatedSeatNos });
          return { ...seat, seatNos: updatedSeatNos };
        } else {
          return { ...seat };
        }
      });

      console.log({ updatedSeatsInfo });

      const updatedRowCopy = rowsCopied.map((currRoe) =>
        currRoe.section === currSeat.category
          ? { ...currRoe, seatsInfo: updatedSeatsInfo }
          : { ...currRoe },
      );

      console.log({ updatedRowCopy });
      ticketsCount++;
      localStorage.setItem("countOfTickets", JSON.stringify(ticketsCount));
      setRowsCopy(updatedRowCopy);
    }
  }

  useEffect(() => {
    console.log("useEffect-Seats");
    console.log({ selectedDate });
    const currRows = getRowsForShow(
      locationsAndTheaters,
      currLocation,
      selectedTheater?.theaterName,
      selectedDate,
      selectedTime,
    );

    console.log({ currRows });

    setRowsCopy(currRows);
    setSeatObjects([]);
    setTotalCost(0);
    ticketsCount = 0;
  }, [selectedTime]);

  function handlePayment() {
    dispatch(updateTotalCost(totalCost));
    dispatch(updateTotalTickets(totalTickets));
    const selectedMovie = JSON.parse(localStorage.getItem("movie"));
    dispatch(updateBookedMovie(selectedMovie));
    dispatch(updateUpdatedRows(rowsCopy));
    const locationsInfo = JSON.parse(localStorage.getItem("seatsPageInfo"));
    dispatch(updateSeatsPageData(locationsInfo));
    navigate("/paymentgateway");
    dispatch(updateSeatObjs(seatObjects));
  }

  return (
    <>
      {rowsCopy?.length > 0 ? (
        <div className={styles.theater}>
          {rowsCopy.map((section, sectionIndex) => (
            <div key={sectionIndex} className={styles.section}>
              <div className={styles.category}>{section.section}</div>
              <table>
                <tbody>
                  {section.seatsInfo.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td
                        className={`${styles.letter} ${row.rowName === "H" ? styles.forHLetter : ""} `}
                      >
                        {row.rowName}
                      </td>
                      <tr key={rowIndex}>
                        {row.seatNos.map((seat, seatIndex) => (
                          <td
                            key={seatIndex}
                            onClick={() => handleBookingSeats(seat)}
                            // prettier-ignore
                            className={`${styles.seatDec} 
                                      ${seat.booked ? styles.seatSelected : ''} 
                                      ${seat.soldOut ? styles.seatSold : ''} 
                                      ${seat.rowName === 'M' && seat.no === 5 ? styles.MfiveSeat : ''}  
                                      ${seat.rowName === 'G' && seat.no === 4 ? styles.GfourSeat : ''}
                                      ${seat.rowName === 'F' && seat.no === 4 ? styles.GfourSeat : ''}
                                      ${seat.rowName === 'E' && seat.no === 4 ? styles.GfourSeat : ''}
                                      ${seat.rowName === "L" && seat.no === 14 ? styles.fourteen : ''}
                                      ${seat.rowName === "K" && seat.no === 14 ? styles.fourteen : ''}
                                      ${seat.rowName === "J" && seat.no === 14 ? styles.fourteen : ''}
                                      ${seat.rowName === "I" && seat.no === 14 ? styles.fourteen : ''}
                                      ${seat.rowName === "H" && seat.no === 14 ? styles.fourteen : ''}
                                      ${seat.rowName === "G" && seat.no === 18 ? styles.eighteen : ''}
                                      ${seat.rowName === "F" && seat.no === 18 ? styles.eighteen : ''}
                                      ${seat.rowName === "E" && seat.no === 18 ? styles.eighteen : ''}
                                      ${seat.rowName === "D" && seat.no === 14 ? styles.fourteen : ''}
                                      ${seat.rowName === "C" && seat.no === 14 ? styles.fourteen : ''}
                                      ${seat.rowName === "B" && seat.no === 14 ? styles.fourteen : ''}
                                      ${seat.rowName === "A" && seat.no === 14 ? styles.fourteen : ''}
                                      `
                                    }
                          >
                            {seat.no}
                          </td>
                        ))}
                      </tr>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {totalTickets === ticketsCount ? (
        <button onClick={handlePayment} className={styles.paymentBtn}>
          Payment: ${totalCost}
        </button>
      ) : (
        ""
      )}
      <div className={styles.imageContainer}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQLIAgR92F8zbbDfzTPZQcRTBA6Ey-2x7tGlXlKVeXczFDEIX6"
          alt="theater screen"
        />
      </div>
    </>
  );
}

export default Seats;
