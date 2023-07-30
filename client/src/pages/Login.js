import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./pages.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../store/userSlice";
import { setUserEmail } from "../store/userSlice";
import url from "../url/url";
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
      dispatch(fetchUser());
    }, [dispatch]);
    const login = async (event) => {
      event.preventDefault();
  
      if (email === "") {
        toast.error("Email is required!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (password === "") {
        toast.error("Password is required!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      const data = { email, password };
  
      try {
        setLoading(true);
        const response = await fetch(`${url}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const jsonResponse = await response.json();
          toast.success("Logged in Successfuly!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          const { token } = jsonResponse;
          setTimeout(() => {
            Cookies.set("accessToken", token);
            dispatch(setUserEmail(jsonResponse.data.email));
            navigate("/");
            setLoading(false);
          }, 1500);
        } else {
          response.json().then((e)=>{
            toast.error(e.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            setLoading(false);
         });
        }
      } catch (error) {
        toast.error("Something Went Wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
      }
    };
  return (
    <div
      style={{
        paddingTop: "7rem",
      }}
    >
      <ToastContainer />
      <div className="login">
        <h2>Login</h2>
        <span className="p-input-icon-left spn">
          <i className="pi pi-envelope" />
          <InputText placeholder="Email" type="email" className="in" onChange={(event) => setEmail(event.target.value)}/>
        </span>
        <span className="p-input-icon-left spn" >
          <i className="pi pi-lock" />
          <InputText placeholder="Password" type="password" className="in" onChange={(event) => setPassword(event.target.value)}/>
        </span>
        <Button
          label="Login"
          icon="pi pi-user"
          className="btns"
          loading={loading} onClick={login}
        />
        <Link to={'/signup'} className="links">Don't have and account? Signup</Link>
      </div>
    </div>
  );
};

export default Login;
