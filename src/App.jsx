/* 
~ Setting up the vite:-

  1] npm i --> install all the npm packages 

  2] Use the snippet rfc.

  3] npm install vite-plugin-eslint --save-dev

  4] Add these two lines of code in rules: {...} of .eslintrc.cjs file, to show yellow underline instead of red:
     'no-unused-vars': 'warn',
     'react/prop-types': 'off', 

 ---------------------------------------------------------------------------------------------------------
 1] npm install -D tailwindcss ---> install tailwind css    
    npx tailwindcss init ---> Created Tailwind CSS config file
    
 2] I should apply this Tailwind CSS for all the files present inside 'src' folder.
     
    ["./src/*.{html,js,jsx} ----> So for all the files in my 'src' folder, any files ending with
                              '.js' OR '.html' extension, so for that particular file you apply 
                              the tailwind CSS.
    
*/

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import MovieDetails from "./components/MovieDetails";
import LocationAndTheater from "./components/LocationAndTheater";
import SeatingArrangement from "./components/SeatingArrangement";
import Payment from "./components/Payment";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from "./components/AdminPanel";
import BookingHistory from "./components/BookingHistory";

/*
^ Parent Route Context:
  When you define an 'index' route, it is always nested inside a 'parent' route. In the case of the 
  below code, the parent route is the base route (/).
    
^ Default Route Matching:
  1] When the 'parent' route is matched, and no other child routes are matched, the 'index' route is the one 
     that gets matched by default.

  2] The 'index' route (<Route index element={<Navbar />} />) matches the 'base' URL by default because 
     it is designed to match when the 'parent' route (in this case, the root route '/') is matched and
     no other 'child' routes are matched.
  
  3] The element={<Navbar />} specifies that the 'Navbar' component should be rendered for this route.


*/

function App() {
  // const [loginDetails, setLoginDetails] = useState({});
  // const [particularMovieDetails, setParticularMovieDetails] = useState({});
  console.log("App component");

  return (
    <>
      {/* <h1 className="text-center text-xl font-semibold text-yellow-500"></h1> */}
      {/* 
        <Navbar />
        <Movies /> 
      */}

      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Just for testing purpose */}
          <Route path="/adminpanel" element={<AdminPanel />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/bookinghistory" element={<BookingHistory />} />
            <Route
              path="/movies"
              element={
                <Movies
                // loginDetails={loginDetails}
                // onSetMovie={setParticularMovieDetails}
                />
              }
            />
            <Route
              path="/moviedetails"
              element={
                /* movieDetail={particularMovieDetails} */
                <MovieDetails />
              }
            />

            <Route
              path="/locationandtheater"
              element={<LocationAndTheater />}
            />
            <Route
              path="/seatingArrangement"
              element={<SeatingArrangement />}
            />
            <Route path="/paymentgateway" element={<Payment />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#374151",
          },
        }}
      />
    </>
  );
}

export default App;
