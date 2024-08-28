//Particular theater's seating arrangement
export const theaterSeatsData = [
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
          soldOut: false,
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

//Function to generate Date Dynamically:-
function generateDates() {
  const DatesInfo = Array.from({ length: 4 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i); // Increment the date by i days

    // Extracting day of the week (e.g., "Fri")
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });

    // Extracting month (e.g., "Aug")
    const month = date.toLocaleString("en-US", { month: "short" });

    // Extracting day of the month (e.g., "09")
    const dayOfMonth = date.toLocaleString("en-US", { day: "2-digit" });

    const currDate = month + " " + dayOfMonth + " " + "2024";

    return currDate;
  });

  return DatesInfo;
}

let DatesArr = generateDates();
console.log({ DatesArr });

//Location And their theater Details:-
export const locationDetails = [
  {
    location: "Mumbai",
    theaters: [
      {
        theaterName: "PVR Lower Parel",
        showDates: [
          {
            // date: "Aug 10 2024",
            date: DatesArr[0],
            showTimes: [
              { time: "8:00 AM", rows: theaterSeatsData },
              { time: "09:30 AM", rows: theaterSeatsData },
            ],
          },
          {
            // date: "Aug 11 2024",
            date: DatesArr[1],
            showTimes: [
              { time: "8:00 AM", rows: theaterSeatsData },
              { time: "09:30 AM", rows: theaterSeatsData },
              { time: "1:30 PM", rows: theaterSeatsData },
            ],
          },
          {
            // date: "Aug 12 2024",
            date: DatesArr[2],
            showTimes: [
              { time: "9:30 AM", rows: theaterSeatsData },
              { time: "12:30 PM", rows: theaterSeatsData },
              { time: "4:00 PM", rows: theaterSeatsData },
              { time: "7:30 PM", rows: theaterSeatsData },
            ],
          },
          {
            // date: "Aug 13 2024",
            date: DatesArr[3],
            showTimes: [
              { time: "10:00 AM", rows: theaterSeatsData },
              { time: "1:00 PM", rows: theaterSeatsData },
              { time: "5:00 PM", rows: theaterSeatsData },
              { time: "8:00 PM", rows: theaterSeatsData },
              { time: "11:00 PM", rows: theaterSeatsData },
            ],
          },
        ],
      },
      {
        theaterName: "Cinepolis Andheri",
        showDates: [
          {
            date: DatesArr[0],
            showTimes: [
              { time: "9:00 AM", rows: theaterSeatsData },
              { time: "12:00 PM", rows: theaterSeatsData },
              { time: "3:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[1],
            showTimes: [
              { time: "10:00 AM", rows: theaterSeatsData },
              { time: "1:00 PM", rows: theaterSeatsData },
              { time: "4:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[2],
            showTimes: [
              { time: "11:00 AM", rows: theaterSeatsData },
              { time: "2:00 PM", rows: theaterSeatsData },
              { time: "5:00 PM", rows: theaterSeatsData },
              { time: "8:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[3],
            showTimes: [
              { time: "12:00 PM", rows: theaterSeatsData },
              { time: "3:00 PM", rows: theaterSeatsData },
              { time: "6:00 PM", rows: theaterSeatsData },
              { time: "9:00 PM", rows: theaterSeatsData },
            ],
          },
        ],
      },
      {
        theaterName: "PVR Cinemas - Phoenix Marketcity",
        showDates: [
          {
            date: DatesArr[0],
            showTimes: [
              { time: "10:00 AM", rows: theaterSeatsData },
              { time: "1:00 PM", rows: theaterSeatsData },
              { time: "4:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[1],
            showTimes: [
              { time: "11:00 AM", rows: theaterSeatsData },
              { time: "2:00 PM", rows: theaterSeatsData },
              { time: "5:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[2],
            showTimes: [
              { time: "12:00 PM", rows: theaterSeatsData },
              { time: "3:00 PM", rows: theaterSeatsData },
              { time: "6:00 PM", rows: theaterSeatsData },
              { time: "9:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[3],
            showTimes: [
              { time: "1:00 PM", rows: theaterSeatsData },
              { time: "4:00 PM", rows: theaterSeatsData },
              { time: "7:00 PM", rows: theaterSeatsData },
              { time: "10:00 PM", rows: theaterSeatsData },
            ],
          },
        ],
      },
    ],
  },
  {
    location: "Delhi",
    theaters: [
      {
        theaterName: "INOX Connaught Place",
        showDates: [
          {
            date: DatesArr[0],
            showTimes: [
              { time: "7:00 AM", rows: theaterSeatsData },
              { time: "10:00 AM", rows: theaterSeatsData },
              { time: "1:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[1],
            showTimes: [
              { time: "8:00 AM", rows: theaterSeatsData },
              { time: "11:00 AM", rows: theaterSeatsData },
              { time: "2:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[2],
            showTimes: [
              { time: "9:00 AM", rows: theaterSeatsData },
              { time: "12:00 PM", rows: theaterSeatsData },
              { time: "3:00 PM", rows: theaterSeatsData },
              { time: "6:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[3],
            showTimes: [
              { time: "10:00 AM", rows: theaterSeatsData },
              { time: "1:00 PM", rows: theaterSeatsData },
              { time: "4:00 PM", rows: theaterSeatsData },
              { time: "7:00 PM", rows: theaterSeatsData },
            ],
          },
        ],
      },
      {
        theaterName: "PVR Saket",
        showDates: [
          {
            date: DatesArr[0],
            showTimes: [
              { time: "8:30 AM", rows: theaterSeatsData },
              { time: "11:30 AM", rows: theaterSeatsData },
              { time: "2:30 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[1],
            showTimes: [
              { time: "9:30 AM", rows: theaterSeatsData },
              { time: "12:30 PM", rows: theaterSeatsData },
              { time: "3:30 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[2],
            showTimes: [
              { time: "10:30 AM", rows: theaterSeatsData },
              { time: "1:30 PM", rows: theaterSeatsData },
              { time: "4:30 PM", rows: theaterSeatsData },
              { time: "7:30 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[3],
            showTimes: [
              { time: "11:30 AM", rows: theaterSeatsData },
              { time: "2:30 PM", rows: theaterSeatsData },
              { time: "5:30 PM", rows: theaterSeatsData },
              { time: "8:30 PM", rows: theaterSeatsData },
            ],
          },
        ],
      },
      {
        theaterName: "INOX Nehru Place",
        showDates: [
          {
            date: DatesArr[0],
            showTimes: [
              { time: "9:30 AM", rows: theaterSeatsData },
              { time: "12:30 PM", rows: theaterSeatsData },
              { time: "3:30 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[1],
            showTimes: [
              { time: "10:30 AM", rows: theaterSeatsData },
              { time: "1:30 PM", rows: theaterSeatsData },
              { time: "4:30 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[2],
            showTimes: [
              { time: "11:30 AM", rows: theaterSeatsData },
              { time: "2:30 PM", rows: theaterSeatsData },
              { time: "5:30 PM", rows: theaterSeatsData },
              { time: "8:30 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[3],
            showTimes: [
              { time: "12:30 PM", rows: theaterSeatsData },
              { time: "3:30 PM", rows: theaterSeatsData },
              { time: "6:30 PM", rows: theaterSeatsData },
              { time: "9:30 PM", rows: theaterSeatsData },
            ],
          },
        ],
      },
    ],
  },
  {
    location: "Bangalore",
    theaters: [
      {
        theaterName: "PVR Orion Mall",
        showDates: [
          {
            date: DatesArr[0],
            showTimes: [
              { time: "9:00 AM", rows: theaterSeatsData },
              { time: "12:00 PM", rows: theaterSeatsData },
              { time: "3:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[1],
            showTimes: [
              { time: "10:00 AM", rows: theaterSeatsData },
              { time: "1:00 PM", rows: theaterSeatsData },
              { time: "4:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[2],
            showTimes: [
              { time: "11:00 AM", rows: theaterSeatsData },
              { time: "2:00 PM", rows: theaterSeatsData },
              { time: "5:00 PM", rows: theaterSeatsData },
              { time: "8:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[3],
            showTimes: [
              { time: "12:00 PM", rows: theaterSeatsData },
              { time: "3:00 PM", rows: theaterSeatsData },
              { time: "6:00 PM", rows: theaterSeatsData },
              { time: "9:00 PM", rows: theaterSeatsData },
            ],
          },
        ],
      },
      {
        theaterName: "INOX Garuda Mall",
        showDates: [
          {
            date: DatesArr[0],
            showTimes: [
              { time: "8:00 AM", rows: theaterSeatsData },
              { time: "11:00 AM", rows: theaterSeatsData },
              { time: "2:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[1],
            showTimes: [
              { time: "9:00 AM", rows: theaterSeatsData },
              { time: "12:00 PM", rows: theaterSeatsData },
              { time: "3:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[2],
            showTimes: [
              { time: "10:00 AM", rows: theaterSeatsData },
              { time: "1:00 PM", rows: theaterSeatsData },
              { time: "4:00 PM", rows: theaterSeatsData },
              { time: "7:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[3],
            showTimes: [
              { time: "11:00 AM", rows: theaterSeatsData },
              { time: "2:00 PM", rows: theaterSeatsData },
              { time: "5:00 PM", rows: theaterSeatsData },
              { time: "8:00 PM", rows: theaterSeatsData },
            ],
          },
        ],
      },
      {
        theaterName: "PVR VR Mall",
        showDates: [
          {
            date: DatesArr[0],
            showTimes: [
              { time: "10:00 AM", rows: theaterSeatsData },
              { time: "1:00 PM", rows: theaterSeatsData },
              { time: "4:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[1],
            showTimes: [
              { time: "11:00 AM", rows: theaterSeatsData },
              { time: "2:00 PM", rows: theaterSeatsData },
              { time: "5:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[2],
            showTimes: [
              { time: "12:00 PM", rows: theaterSeatsData },
              { time: "3:00 PM", rows: theaterSeatsData },
              { time: "6:00 PM", rows: theaterSeatsData },
              { time: "9:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[3],
            showTimes: [
              { time: "1:00 PM", rows: theaterSeatsData },
              { time: "4:00 PM", rows: theaterSeatsData },
              { time: "7:00 PM", rows: theaterSeatsData },
              { time: "10:00 PM", rows: theaterSeatsData },
            ],
          },
        ],
      },
    ],
  },
  {
    location: "Pune",
    theaters: [
      {
        theaterName: "PVR Pune Central",
        showDates: [
          {
            date: DatesArr[0],
            showTimes: [
              { time: "9:00 AM", rows: theaterSeatsData },
              { time: "12:00 PM", rows: theaterSeatsData },
              { time: "3:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[1],
            showTimes: [
              { time: "10:00 AM", rows: theaterSeatsData },
              { time: "1:00 PM", rows: theaterSeatsData },
              { time: "4:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[2],
            showTimes: [
              { time: "11:00 AM", rows: theaterSeatsData },
              { time: "2:00 PM", rows: theaterSeatsData },
              { time: "5:00 PM", rows: theaterSeatsData },
              { time: "8:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[3],
            showTimes: [
              { time: "12:00 PM", rows: theaterSeatsData },
              { time: "3:00 PM", rows: theaterSeatsData },
              { time: "6:00 PM", rows: theaterSeatsData },
              { time: "9:00 PM", rows: theaterSeatsData },
            ],
          },
        ],
      },
      {
        theaterName: "INOX Pune",
        showDates: [
          {
            date: DatesArr[0],
            showTimes: [
              { time: "8:00 AM", rows: theaterSeatsData },
              { time: "11:00 AM", rows: theaterSeatsData },
              { time: "2:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[1],
            showTimes: [
              { time: "9:00 AM", rows: theaterSeatsData },
              { time: "12:00 PM", rows: theaterSeatsData },
              { time: "3:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[2],
            showTimes: [
              { time: "10:00 AM", rows: theaterSeatsData },
              { time: "1:00 PM", rows: theaterSeatsData },
              { time: "4:00 PM", rows: theaterSeatsData },
              { time: "7:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[3],
            showTimes: [
              { time: "11:00 AM", rows: theaterSeatsData },
              { time: "2:00 PM", rows: theaterSeatsData },
              { time: "5:00 PM", rows: theaterSeatsData },
              { time: "8:00 PM", rows: theaterSeatsData },
            ],
          },
        ],
      },
      {
        theaterName: "Cinepolis Seasons Mall",
        showDates: [
          {
            date: DatesArr[0],
            showTimes: [
              { time: "10:00 AM", rows: theaterSeatsData },
              { time: "1:00 PM", rows: theaterSeatsData },
              { time: "4:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[1],
            showTimes: [
              { time: "11:00 AM", rows: theaterSeatsData },
              { time: "2:00 PM", rows: theaterSeatsData },
              { time: "5:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[2],
            showTimes: [
              { time: "12:00 PM", rows: theaterSeatsData },
              { time: "3:00 PM", rows: theaterSeatsData },
              { time: "6:00 PM", rows: theaterSeatsData },
              { time: "9:00 PM", rows: theaterSeatsData },
            ],
          },
          {
            date: DatesArr[3],
            showTimes: [
              { time: "1:00 PM", rows: theaterSeatsData },
              { time: "4:00 PM", rows: theaterSeatsData },
              { time: "7:00 PM", rows: theaterSeatsData },
              { time: "10:00 PM", rows: theaterSeatsData },
            ],
          },
        ],
      },
    ],
  },
];
