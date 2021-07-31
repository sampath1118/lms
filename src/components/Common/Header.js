import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  let state = useSelector((state123) => state123);
  const dispatch = useDispatch();
  const arr = [
    "home",
    "admin",
    "faculty",
    "student",
    "courses",
    "slots",
    "batch",
    "chart",
    "graph",
    "planner",
    "attendence",
  ];
  let { loggedin, role, user } = state;
  // let role = "student";
  // let loggedin = true;
  // let user = { name: "sampii@demo.com" };

  const logout = () => {
    dispatch({ type: "logout" });
  };
  return (
    <>
      {loggedin ? (
        <header>
          <h1 className="g">{role} panel</h1>
          <div>
            {arr.map((item) => {
              return <Link to={`/${role}/${item}`}>{item} &nbsp;</Link>;
            })}
            <Link to="/" onClick={logout}>
              logout (<span className="bold">{user.name}</span>)
            </Link>
          </div>
        </header>
      ) : (
        <header>
          <h1 className="g">guest panel</h1>
          <div>
            {arr.map((item) => {
              return <Link>{item} &nbsp;</Link>;
            })}
            <Link>logout guest</Link>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
