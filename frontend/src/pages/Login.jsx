import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, AlertTitle } from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const navigateToHomepage = () => {
    navigate("/");
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const sendCredentials = (event) => {
    event.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.info(response);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("firstname", response.data.firstname);
        localStorage.setItem("lastname", response.data.lastname);
        setSuccess(response.data.message);
        setError(false);
        navigateToHomepage();
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setSuccess(false);
      });
  };

  return (
    <div className="login_up">
      <h1>Sign in to X</h1>
      <div className="login_formulaire">
        <form onSubmit={sendCredentials}>
          <input
            type="email"
            placeholder="Email"
            onChange={handleChangeEmail}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={handleChangePassword}
          />
          <button className="btn-connecter" type="submit">
            Login
          </button>

          <br />
          <br />
        </form>

        <Link to="/signup" className="btn-signup">
          First time using X? Create an account
        </Link>
        <br />
        {success && (
          <Alert severity="success">
            <AlertTitle>Congratulations</AlertTitle>
            User logged in — <strong>successfully!</strong>
          </Alert>
        )}

        {/* {error ? "Email ou password incorrects" : ""} */}
        {error && (
          <Alert severity="error">
            <AlertTitle>Email ou password incorrects</AlertTitle>
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
}
