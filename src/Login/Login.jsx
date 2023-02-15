import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import "./Login.css";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

const MyCustomButton = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

export function Login() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        window.location.href = "/"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  // const [user, setUser] = useState({});

  // function handleCallbackResponse(response) {
  //   console.log("Encoded JWT ID token: " + response.credential);
  //   var userObject = jwt_decode(response.credential);
  //   console.log(userObject);
  //   setUser(userObject);
  //   document.getElementById("signInDiv").hidden = true;
  // }

  // function handleSignOut(event) {
  //   setUser({});
  //   document.getElementById("signInDiv").hidden = false;
  // }

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id:
  //       "",
  //     callback: handleCallbackResponse,
  //   });

  //   google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //     theme: "outline",
  //     size: "large",
  //   });

  //   google.accounts.id.prompt();
  // }, []);
  return (
    <div id="login">
      <ul class="error-list">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} class="login-form">
        <img
          src="https://media.giphy.com/media/KZr0Y4SzxCiYEEI8TM/giphy.gif"
          alt="logo"
          class="logo-image"
        />
        <h1 class="title">Sign In</h1>
        <h3>
          <center>Welcome to PlantHub!</center>
        </h3>
        <div class="form-group">
          Email: <input name="email" type="email" class="form-control" />
        </div>
        <div class="form-group">
          Password:{" "}
          <input name="password" type="password" class="form-control" />
        </div>
        <button type="submit" class="submit-button">
          Sign In
        </button>
        <GoogleOAuthProvider clientId="">
          <LoginPage />
        </GoogleOAuthProvider>
      </form>
    </div>
  );
}

const LoginPage = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    flow: "implicit",
    scope: "https://www.googleapis.com/auth/calendar",
  });

  return (
    <div>
      <MyCustomButton onClick={() => login()}>
        Sign in with Google 🚀{" "}
      </MyCustomButton>
    </div>
  );
};
