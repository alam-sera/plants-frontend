import axios from "axios";
import React, { useState } from "react";
import "./Signup.css";

export function Signup() {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        event.target.reset();
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div className="background_for_signup">
      <div className="signup">
        <h2>Signup</h2>
        {errors.map((error) => (
          <div key={error} className="errors">
            {error}
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <p>
            Name:{" "}
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              name="name"
            />
          </p>
          {/* <p>{20 - name.length} characters left</p> */}
          <p>
            Email: <input type="email" name="email" />
          </p>
          <p>
            Password: <input type="password" name="password" />
          </p>
          <p>
            Password Confirmation:{" "}
            <input type="password" name="password_confirmation" />
          </p>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}
