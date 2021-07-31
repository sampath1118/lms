import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { _get } from "../../services";
import { useSelector, useDispatch } from "react-redux";
function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const load = async () => {
    dispatch({ type: "loader-true" });
    let admin = await _get("admin/admin").then((d) => (d.status ? d.data : []));
    let faculty = await _get("admin/faculty").then((d) =>
      d.status ? d.data : []
    );
    let student = await _get("admin/student").then((d) =>
      d.status ? d.data : []
    );
    let courses = await _get("admin/courses").then((d) =>
      d.status ? d.data : []
    );
    let slots = await _get("admin/slots").then((d) => (d.status ? d.data : []));
    let batch = await _get("admin/batch").then((d) => (d.status ? d.data : []));

    dispatch({ type: "admin", payload: admin });
    dispatch({ type: "faculty", payload: faculty });
    dispatch({ type: "student", payload: student });
    dispatch({ type: "courses", payload: courses });
    dispatch({ type: "slots", payload: slots });
    dispatch({ type: "batch", payload: batch });
    dispatch({ type: "loader-false" });
  };
  useEffect(load, []);
  let arr = ["admin", "faculty", "student", "courses", "slots", "batch"];
  return (
    <>
      <div className="home">
        {arr.map((x) => (
          <div className="home-item">
            <h2>{x.toUpperCase()}</h2>
            <h3>Total ({state[x].length})</h3>
            <Link to={"/" + state.role + "/" + x}>
              View {x.toUpperCase()} ({state[x].length})
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
