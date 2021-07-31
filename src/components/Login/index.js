import React from "react";
import { notification } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { _post } from "../../services/index";

function Login(props) {
  const dispatch = useDispatch();
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");
  let [role, setrole] = useState("");

  const login = (event) => {
    event.preventDefault();
    dispatch({ type: "loader-true" });

    _post("login", { email, password, role })
      .then((d) => {
        dispatch({ type: "loader-false" });
        if (d.status) {
          notification.open({ message: "logged in as " + role });
          sessionStorage.setItem("token", d.data.token);
          sessionStorage.setItem("role", role);
          sessionStorage.setItem("name", d.data.user.name);
          dispatch({ type: role + "-login", payload: d.data.user.name });
          props.history.push("/" + role + "/home");
        } else {
          notification.open({ message: "failed login as " + role });
        }
      })
      .catch((d) => {
        dispatch({ type: "loader-false" });
        console.log(d);
      });
  };
  return (
    <>
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <p>Email</p>
        <input
          placeholder="Email"
          value={email}
          onChange={(event1) => setemail(event1.target.value)}
        />
        <p>password</p>
        <input
          placeholder="password"
          value={password}
          onChange={(event) => setpassword(event.target.value)}
        />
        <p>role</p>
        <select onChange={(event) => setrole(event.target.value)}>
          <option selected={role === ""}>select a role</option>
          <option selected={role === "admin"}>admin</option>
          <option selected={role === "faculty"}>faculty</option>
          <option selected={role === "student"}>student</option>
        </select>
        <button>Login</button>
      </form>
    </>
  );
}

export default Login;
