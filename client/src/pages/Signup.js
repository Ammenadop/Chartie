import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./pages.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import url from "../url/url";
const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const signup = async (event) => {
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
        if (password !== confirmPassword) {
          toast.error("Confirm password must be same as Password!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }
        const data = { email, password };
  
      try {
        setLoading(true);
        const response = await fetch(`${url}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        
        if (response.ok) {
          toast.success("You have successfuly registered!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            navigate("/login");
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
        <h2>Signup</h2>
        <span className="p-input-icon-left spn">
          <i className="pi pi-envelope" />
          <InputText placeholder="Email" type="email" className="in" onChange={(event) => setEmail(event.target.value)}/>
        </span>
        <span className="p-input-icon-left spn">
          <i className="pi pi-lock" />
          <InputText placeholder="Password" className="in" onChange={(event) => setPassword(event.target.value)}/>
        </span>
        <span className="p-input-icon-left spn">
          <i className="pi pi-lock" />
          <InputText type="password" placeholder="Confirm Password" className="in"onChange={(event) => setconfirmPassword(event.target.value)}/>
        </span>
        
        <Button
          label="Signup"
          icon="pi pi-user"
          className="btns"
          loading={loading} onClick={signup}
        />
        <Link to={'/login'} className="links">Already have an account? Login</Link>
      </div>
    </div>
  );
}

export default Signup