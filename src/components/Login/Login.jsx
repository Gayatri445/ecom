import React, { useContext, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiFillFileText } from "react-icons/ai";
import { toast } from "react-toastify";

import axios from "axios";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { Context } from "../../utils/context";
const Login = () => {
  const { handleUserLogin } = useContext(Context);
  const initialUser = { username: "", email: "", password: "" };
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((currentUser) => ({
      ...currentUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = async () => {
    const url = "http://localhost:1337/api/auth/local/register";
    try {
      if (user.username && user.email && user.password) {
        const res = await axios.post(url, user);
        if (res) {
          toast.success("Sign up is successfull", {
            hideProgressBar: true,
          });
          setUser(initialUser);
          setIsSignUp(false);
        }
      }
    } catch (error) {
      console.log({ error });
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  const handleLogin = async () => {
    const url = "http://localhost:1337/api/auth/local";
    try {
      if (user.email && user.password) {
        const loginData = {
          identifier: user.email,
          password: user.password,
        };
        const { data } = await axios.post(url, loginData);
        if (data.jwt) {
          toast.success("Logged in successfully", {
            hideProgressBar: true,
          });
          setUser(initialUser);
          navigate("/");
          handleUserLogin(data.user);
        }
      }
    } catch (error) {
      console.log({ error });
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };
  return (
    <div className="login-container">
      {/* content box */}
      <div className="loginBox ">
        <p className="auth">
          {isSignUp ? "Sign Up" : "Sign In"} with following
        </p>

        {/* input section */}

        <div className="loginInput">
          {isSignUp && (
            <div className="loginInput-container">
              <AiFillFileText />
              <input
                placeholder={"Enter username here"}
                value={user.username}
                type="text"
                name="username"
                onChange={handleChange}
              />
            </div>
          )}
          <div className="loginInput-container">
            <FaEnvelope />
            <input
              placeholder={"Enter your email here"}
              value={user.email}
              onChange={handleChange}
              type="email"
              name="email"
            />
          </div>
          <div className="loginInput-container">
            <FaLock />

            <input
              placeholder={"Enter password here"}
              value={user.password}
              onChange={handleChange}
              type="password"
              name="password"
            />
          </div>

          {!isSignUp ? (
            <p className="para">
              Doesn't have an account :{" "}
              <button className="btn" onClick={() => setIsSignUp(true)}>
                Create one
              </button>
            </p>
          ) : (
            <p className="para">
              Already have an account :{" "}
              <button className="btn" onClick={() => setIsSignUp(false)}>
                Sign-in here
              </button>
            </p>
          )}

          {isSignUp ? (
            <button className="btn-sign" onClick={handleSignUp}>
              Sign Up
            </button>
          ) : (
            <button className="btn-sign" onClick={handleLogin}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
