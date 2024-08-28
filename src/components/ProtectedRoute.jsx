import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  console.log("ProtectedRoute comp");

  const { isAuthenticated } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();

  //Accessing LocalStorage
  const userInfo = JSON.parse(localStorage.getItem("signInData"));
  const isAuth = isAuthenticated ? isAuthenticated : userInfo?.isAuthenticated;
  console.log({ isAuth });

  useEffect(() => {
    if (!isAuth) {
      navigate("/signin");
    }
  }, []);

  return <>{isAuth ? children : null}</>;
}

export default ProtectedRoute;
