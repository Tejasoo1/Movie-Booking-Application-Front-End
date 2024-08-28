import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import styles from "./Payment.module.css";

import Axios from "axios";
import { updateBookingHistory } from "./userSlice";
import { useNavigate } from "react-router-dom";

function Payment() {
  console.log(store.getState());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    bookedMovie,
    totalCost,
    totalTickets,
    seatObjs,
    seatsPageData,
    updatedRows,
  } = useSelector((state) => state.seatsAndBookingInfo);

  const { currLocation } = useSelector((state) => state.locationAndTheater);

  console.log(seatsPageData);

  // Function to generate the required string
  const generateSeatString = (seats) => {
    const categoryMap = {};

    // Group seats by category
    seats.forEach((seat) => {
      const category = seat.category.split(" ")[2]; // Extract the category name (e.g., "Premium", "Executive")
      const seatInfo = `${seat.rowName}${seat.no}`; // Combine rowName and no (e.g., "L20")

      if (!categoryMap[category]) {
        categoryMap[category] = [];
      }
      categoryMap[category].push(seatInfo);
    });

    // Construct the final string
    const seatStrings = Object.keys(categoryMap).map((category) => {
      return `${category}- ${categoryMap[category].join(", ")}`;
    });

    return seatStrings.join(", ");
  };

  const result = generateSeatString(seatObjs);
  console.log({ result });

  //selected Theater information
  const selectedTheaterInfo = seatsPageData.selectedTheater;
  console.log({ selectedTheaterInfo });

  //Derived State. (Date which is currently active)
  const currActiveDateObj = seatsPageData?.currDates?.find(
    (curr) => curr.active,
  );

  //This selected date, format for displaying in the UI.
  const currActiveDate = currActiveDateObj.date + " " + currActiveDateObj.month;
  console.log(currActiveDate);

  //This date format needed to find currShowTimes
  const currDate =
    currActiveDateObj.month + " " + currActiveDateObj.date + " " + "2024";

  //Time selected
  const currentTime = seatsPageData?.selectedTime;
  console.log(currentTime);

  //Extracting the Theater Brand.
  const brandName = selectedTheaterInfo?.theaterName.split(" ")[0];
  console.log(brandName);

  //Extracting the name of the person who has booked the tickets.
  const userDetails = useSelector((state) => state.userInfo);
  console.log({ userDetails });

  //Name of the user who has booked the ticket.
  const userName = userDetails?.signInData?.email?.match(/^[a-zA-Z]+/)[0];

  // Output: "patiltejas"
  console.log({ userName });

  //If bookingHistory is empty inside global UI state (DO THIS)
  let fetchedBookingHistory = [];

  if (userDetails?.bookingHistory.length === 0) {
    //Fetch bookingHistory data for userEmail from backend.

    // Axios.post("http://localhost:5000/get/bookinghistory", {
    //   ...userDetails?.signInData,
    // }).then((res) => {
    //   console.log({ result: res.data });
    //   fetchedBookingHistory = res.data.bookingHistoryArray;
    //   console.log({ fetchedBookingHistory });
    // });

    Axios.post(
      "https://movies-booking-application-back-end.onrender.com/get/bookinghistory",
      {
        ...userDetails?.signInData,
      },
    ).then((res) => {
      console.log(res.data);
      fetchedBookingHistory = res.data.bookingHistoryArray;
    });
  }

  //Event handler func.
  function handleSoldOutSeats(data) {
    const updatedData = data.map((section) => ({
      ...section,
      seatsInfo: section.seatsInfo.map((row) => ({
        ...row,
        seatNos: row.seatNos.map((seat) => ({
          ...seat,
          soldOut: seat.booked ? true : seat.soldOut,
        })),
      })),
    }));

    return updatedData;
  }

  //Event handler func.
  function makePayment() {
    const ticket = {
      totalAmount: totalCost + 142,
      seatData: result,
      totalTickets,
      time: currentTime,
      date: currActiveDate,
      location: seatsPageData?.currLocation,
      theaterName: selectedTheaterInfo?.theaterName,
    };

    Axios.post(
      "https://movies-booking-application-back-end.onrender.com/create/order",
      { ...ticket },
    )
      .then((res) => {
        console.log(res.data.output);
        handlePaymentVerify(res.data.output);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePaymentVerify(receivedData) {
    //Logic to do the verification:-
    const options = {
      key: "rzp_test_nYzcBduG1fFZdb", // ---> Razorpay key_id
      amount: receivedData.amount,
      currency: receivedData.currency,
      name: userName, //Name of the person who wants to make the order.
      description: `${bookedMovie?.movie_name}`,
      order_id: receivedData.id,
      handler: (output) => {
        //Logic for verification:-
        /* 
          1] First you have to connect to the backend, after connecting to the backend then
             you can verify. 
        */
        console.log({ output });

        const data = [...updatedRows];
        const updatedData = handleSoldOutSeats(data);
        console.log({ updatedData });

        const updateLocationsTheater = {
          location: seatsPageData?.currLocation,
          theaterName: selectedTheaterInfo?.theaterName,
          date: currDate,
          time: currentTime,
          updatedRows: updatedData,
        };

        Axios.post(
          "https://movies-booking-application-back-end.onrender.com/update/locationsandtheaters",
          {
            ...updateLocationsTheater,
          },
        ).then((output) => {
          console.log(output.data);
          const bookingObj = {
            movieDetails: bookedMovie,
            totalTickets,
            totalCost,
            currLocation,
            theaterName: selectedTheaterInfo?.theaterName,
            date: currDate,
            time: currentTime,
            seatInfo: result,
            day: currActiveDateObj.day,
          };

          dispatch(updateBookingHistory(bookingObj));

          //Remove some stuff from localstorage.
          localStorage.removeItem("moviesPageInfo");
          localStorage.removeItem("movie");
          localStorage.removeItem("seatsPageInfo");
          localStorage.removeItem("countOfTickets");

          //Logic to update booking history in backend.
          const bookingarr =
            userDetails?.bookingHistory.length > 0
              ? userDetails?.bookingHistory
              : fetchedBookingHistory;
          console.log({ bookingarr });

          const bookingDataBackend = {
            userEmail: userDetails?.signInData?.email,
            bookingHistoryArray: [...bookingarr, bookingObj],
          };

          Axios.post(
            "https://movies-booking-application-back-end.onrender.com/update/bookinghistory",
            {
              ...bookingDataBackend,
            },
          ).then((res) => {
            console.log(res.data);
            //navigate to BookingHistory Page
            navigate("/bookinghistory");
          });

          // Axios.post("http://localhost:5000/update/bookinghistory", {
          //   ...bookingDataBackend,
          // }).then((res) => {
          //   console.log(res.data);
          //   //navigate to BookingHistory Page
          //   navigate("/bookinghistory");
          // });
        });
      },
    };

    new window.Razorpay(options).open();
  }

  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.mainHeader}>
          <div className={styles.bookingInfo}>
            <p>
              {bookedMovie?.movie_name} | {bookedMovie?.censor}
            </p>
            <div className={styles.bottomInfo}>
              <p>
                {selectedTheaterInfo?.theaterName} {seatsPageData.currLocation},
              </p>
              <p>
                {currActiveDate}, {currentTime}
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className={styles.bookingSummaryContainer}>
        <div className={styles.summaryBox}>
          <h3 className={styles.summaryTitle}>BOOKING SUMMARY</h3>

          <div className={styles.item}>
            {/* 
               <span>VIP - 05, 06 (2 Tickets)</span>
               <span>Rs. 1300.00</span> 
            */}
            <span>
              {result} ({totalTickets} Tickets)
            </span>
            <span>Rs. {totalCost}</span>
          </div>

          <div className={styles.item}>
            <span>{brandName}</span>
          </div>

          <div className={styles.item}>
            <span>+ Convenience fees</span>
            <span>Rs. 141.60</span>
          </div>

          <hr className={styles.divider} />

          <div className={styles.item}>
            <span>Subtotal</span>
            <span>Rs. {parseInt(totalCost) + 141.6}</span>
          </div>

          <p className={styles.stateNotice}>
            Your current city is {seatsPageData.currLocation}
          </p>

          <div className={styles.amountPayable}>
            <span>Amount Payable</span>
            <span className={styles.amount}>
              Rs. {parseInt(totalCost) + 141.6}
            </span>
          </div>

          <div className={styles.ticketType}>
            <h4 className={styles.ticketTypeTitle}>SELECT TICKET TYPE</h4>
            <div className={styles.ticketOptions}>
              <div className={styles.option}>
                <input type="radio" id="mTicket" name="ticketType" />
                <label htmlFor="mTicket">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuo7elQe3gjDcpgyy2rm8K46K3lWwddg9VNFUMcMtNFhEYk_IBBTfJ48QH_c0rwYqMdLE&usqp=CAU"
                    alt="mTicket"
                  />
                  mTicket
                </label>
              </div>
              <div className={styles.option}>
                <input type="radio" id="boxOffice" name="ticketType" />
                <label htmlFor="boxOffice">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="Box Office Pickup"
                    className={styles.BoxOfficeImg}
                  />
                  Box Office Pickup
                </label>
              </div>
            </div>
          </div>

          <p className={styles.notice}>
            Show the mTicket QR Code on your mobile to enter the cinema.
          </p>

          <div className={styles.totalAmount}>
            <span>TOTAL: Rs. {parseInt(totalCost) + 141.6}</span>
            <button className={styles.proceedButton} onClick={makePayment}>
              Proceed
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
