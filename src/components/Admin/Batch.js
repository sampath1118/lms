import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { _get, _post, _delete, findIArr } from "../../services";
import { notification } from "antd";

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  let { faculty, student, courses, slots, batch, fid, sid, cid, slot_id } =
    state;
  const loadAll = () => {
    _get("admin/faculty")
      .then((d) => (d.status ? d.data : Promise.reject("request failed")))
      .then((d) => dispatch({ type: "faculty", payload: d }))
      .catch((e) => notification.open({ message: JSON.stringify(e) }));
    _get("admin/student")
      .then((d) => (d.status ? d.data : Promise.reject("request failed")))
      .then((d) => dispatch({ type: "student", payload: d }))
      .catch((e) => notification.open({ message: JSON.stringify(e) }));
    _get("admin/courses")
      .then((d) => (d.status ? d.data : Promise.reject("request failed")))
      .then((d) => dispatch({ type: "courses", payload: d }))
      .catch((e) => notification.open({ message: JSON.stringify(e) }));
    _get("admin/slots")
      .then((d) => (d.status ? d.data : Promise.reject("request failed")))
      .then((d) => dispatch({ type: "slots", payload: d }))
      .catch((e) => notification.open({ message: JSON.stringify(e) }));
    _get("admin/batch")
      .then((d) => (d.status ? d.data : Promise.reject("request failed")))
      .then((d) => dispatch({ type: "batch", payload: d }))
      .catch((e) => notification.open({ message: JSON.stringify(e) }));
  };
  useEffect(loadAll, []);

  const p1 = (x) => {
    dispatch({ type: "sid", payload: x._id });
    dispatch({ type: "cid", payload: x.course });
  };

  const p2 = (e, id) => {
    e.preventDefault();
    dispatch({ type: "slot_id", payload: id });
  };
  const p3 = (e, data) => {
    e.preventDefault();
    dispatch({ type: "loader-true" });
    let obj = {
      faculty: data.fid,
      student: data.sid,
      course: data.cid,
      slot: data.slot_id,
    };
    _post("admin/batch", obj)
      .then((d) => (d.status ? d.data : Promise.reject(d.data)))
      .then((d) => {
        notification.open({ message: "batch created" });
        console.log(d);
        dispatch({ type: "loader-false" });
      })
      .catch((e) => {
        notification.open({ message: e });
        dispatch({ type: "loader-false" });
      });
  };
  return (
    <>
      <div className="b-flex">
        <div className="item1">
          <h5>slots {slots.length}</h5>
          <div className="scroll">
            {slots.map((x) => (
              <p
                onDrop={(e) => p3(e, { fid, sid, cid, slot_id })}
                onDragOver={(e) => p2(e, x._id)}
                className={x._id === slot_id ? "active" : ""}
              >
                {x.name}
              </p>
            ))}
          </div>
        </div>

        <div className="item1">
          <h5>student {student.length}</h5>
          <div className="scroll">
            {student.map((x) => (
              <p
                onDragStart={(e) => p1(x)}
                draggable={true}
                className={x._id === sid ? "active" : ""}
              >
                {x.name}
              </p>
            ))}
          </div>
        </div>

        <div className="item1">
          <h5>courses {courses.length}</h5>
          <div className="scroll">
            {courses.map((x) => (
              <p className={x._id === cid ? "active" : ""}>{x.name}</p>
            ))}
          </div>
        </div>

        <div className="item1">
          <h5>faculty {faculty.length}</h5>
          <div className="scroll">
            {faculty.map((x) => (
              <p
                onClick={(e) => dispatch({ type: "fid", payload: x._id })}
                className={x._id === fid ? "active" : ""}
              >
                {x.name}
              </p>
            ))}
          </div>
        </div>

        <div className="item2">
          <h5>bactch {batch.length}</h5>
          <div className="scroll">
            <table cellPadding={10} cellSpacing={0}>
              <thead>
                <tr>
                  <th>sno</th>
                  <th>time</th>
                  <th>date</th>
                  <th>student</th>
                  <th>course</th>
                  <th>faculty</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {batch.map((x) => (
                  <tr>
                    <td>{x._id}</td>
                    <td>{findIArr(slots, x.slot, "name")}</td>
                    <td>{x.createdAt.split(" ").slice(1, 5).join(" ")}</td>
                    <td>{findIArr(student, x.student, "name")}</td>
                    <td>{findIArr(courses, x.course, "name")}</td>
                    <td>{findIArr(faculty, x.faculty, "name")}</td>
                    <td>Edit / Delete</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
