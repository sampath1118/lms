import React, { useEffect } from "react";
import { notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  _get,
  findIArr,
  _cal,
  _batchExists,
  _batchCount,
  _patch,
} from "../../services";

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  let { batch, courses, student, faculty, slots } = state;

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

  const markunmark = (ob, p) => {
    let id = ob._id;
    let data = {
      reason: "admin marked",
      remarks: "approved by admin",
      approved_by: "admin",
      status: "disabled",
      present: "good",
    };

    if (p === "good") {
      data = {
        reason: "admin unmarked",
        remarks: "rejected by admin",
        approved_by: "admin",
        status: "disabled",
        present: "bad",
      };
    }
    _patch("admin/attendance/" + id, data)
      .then((d) => (d.status ? d.data : Promise.reject(d.data)))
      .then((d) => batch.map((x) => (x._id === id ? d : x)))
      .then((d) => {
        console.log(d);
        dispatch({ type: "batch", payload: d });
      })
      .then((d) => notification.open({ message: "marked success" }))
      .catch((e) => notification.open({ message: JSON.stringify(e) }));
  };

  const good = <label className="green">present</label>;
  const bad = <label className="red">absent</label>;
  return (
    <>
      <div className="wrapper">
        <h1>Attendance</h1>
        <div className="scroll">
          <table cellPadding={10} cellSpacing={0}>
            <thead>
              <tr>
                <th>date</th>
                <th>time</th>
                <th>student</th>
                <th>course</th>
                <th>faculty</th>
                <th>reason</th>
                <th>remarks</th>
                <th>present</th>
                <th>approved_by</th>
              </tr>
            </thead>
            <tbody>
              {batch.map((x) => (
                <tr>
                  <td>{findIArr(slots, x.slot, "name")}</td>
                  <td>{x.createdAt.split(" ").slice(1, 5).join(" ")}</td>
                  <td>{findIArr(student, x.student, "name")}</td>
                  <td>{findIArr(courses, x.course, "name")}</td>
                  <td>{findIArr(faculty, x.faculty, "name")}</td>
                  <td>{x.reason ? x.reason : "NA"}</td>
                  <td>{x.remarks ? x.remarks : "NA"}</td>
                  <td onClick={(e) => markunmark(x, x.present)}>
                    {x.present === "good" ? good : bad}
                  </td>
                  <td>{x.approved_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
