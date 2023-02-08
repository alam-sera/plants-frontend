import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
      })
      .catch((error) => {
        console.log("in the catch!!!");
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div>
      <h2>Signup</h2>
      {errors.map((error) => (
        <div key={error}>{error}</div>
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
        {/* figure out how to show "17 characters left" when use has typed 3 characters */}
        <p>{20 - name.length} characters left</p>
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
  );
}
