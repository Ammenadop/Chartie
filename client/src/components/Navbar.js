import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../store/userSlice";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const logout=()=>{
    dispatch(setLogout(null));
    navigate("/login");
    toast.success("Logged out Successfuly!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return (
    <div className="nav">
      <div className="logo">
        <Link to={"/"} className="links">
          <h1>Chartie</h1>
        </Link>
      </div>
      <div className="cart">
        {user ? (
          <div style={{display:'flex'}}>
            <h4>{user}</h4>
            <i className="pi pi-fw pi-power-off" onClick={logout}></i>
          </div>
        ) : <h4>Welcome!</h4>
      }
      <ToastContainer />
      </div>
    </div>
  );
};

export default Navbar;
