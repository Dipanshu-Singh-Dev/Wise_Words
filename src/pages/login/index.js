import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";
const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:4000/users?q=${username}`
      );
      const data = response.data;

      const deets = data.filter((e) => {
        if (e.username === username && e.password === password) return e;
      });
      const { role, username: user } = deets[0];
      if (deets.length == 0) window.alert("Please check your credentials");
      else {
        dispatch({ type: "Login", role, user });
        router.push("/");
      }
    } catch (error) {
      window.alert("Error");
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <br />
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
          />
        </label>
        <br />
        <label>
          Password:
          <br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
