import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedPassword, setCheckedPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChangePrenom = (event) => {
    setLastname(event.target.value);
  };
  const handleChangeNom = (event) => {
    setFirstname(event.target.value);
  };

  // const handleChangeUsername = (event) => {
  //   setUsername(event.target.value);
  // };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeCheckedPassword = (event) => {
    setCheckedPassword(event.target.value);
  };

  const sendRegisterData = (event) => {
    event.preventDefault();

    if (password === checkedPassword) {
      console.info("email", email);
      console.info("password", password);
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/users`, {
          firstname,
          lastname,
          // username,
          email,
          password,
        })
        .then((response) => {
          setSuccess(response.data.message);
          setError(false);
          console.info(response);
        })
        .catch((err) => {
          if (
            err.response.data.error === `"firstname" is not allowed to be empty`
          ) {
            setError("Le Prénom ne peut pas être vide");
          } else if (
            err.response.data.error === `"firstname" must be a valid name`
          ) {
            setError("Mettre un prénom valide");
          } else if (
            err.response.data.error === `"lastname" is not allowed to be empty`
          ) {
            setError("Le Nom ne peut pas être vide");
          } else if (
            err.response.data.error === `"lastname" must be a valid name`
          ) {
            setError("Mettre un nom valide");
          } else if (
            err.response.data.error === `"email" is not allowed to be empty`
          ) {
            setError("L'email ne peut pas être vide");
          } else if (
            err.response.data.error === `"email" must be a valid email`
          ) {
            setError("Mettre un email valide");
          } else if (
            err.response.data.error === `"password" is not allowed to be empty`
          ) {
            setError("Merci de donner un mot de passe");
          } else if (
            err.response.data.error ===
            `"password" length must be at least 8 characters long`
          ) {
            setError("Le mot de passe doit faire au moins 8 caractères");
          } else if (err.response.data.error === 1062) {
            setError("L'email est déjà enregistré");
          } else {
            console.error(err.response.data.error);
          }
          setSuccess(false);
        });
    } else {
      setError("Les mots de passe ne correspondent pas");
      console.error("Les mots de passe ne correspondent pas");
    }
  };

  return (
    <>
      <div className="signup_background">
        <h1>Happening now</h1>
        <form onSubmit={sendRegisterData}>
          <input
            type="text"
            placeholder="Firstname"
            onChange={handleChangePrenom}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Lastname"
            onChange={handleChangeNom}
          />
          <br />
          <br />
          {/* <input
            type="text"
            placeholder="Username"
            onChange={handleChangeUsername}
          />
          <br />
          <br /> */}
          <input
            type="email"
            placeholder="Adresse email"
            onChange={handleChangeEmail}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={handleChangePassword}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Confirm your password"
            onChange={handleChangeCheckedPassword}
          />
          <br />
          <br />
          <button className="btn-create" type="submit">
            Créer un compte
          </button>
        </form>
        <br />
        <Link to="/login">Already have an account? Sign in</Link>
      </div>
      {success ? <p>{success}</p> : ""}
      {error ? <p>{error}</p> : ""}
    </>
  );
}
