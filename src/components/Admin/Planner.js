import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findIArr, _cal, _batchExists, _batchCount } from "../../services";
function App() {
  const [id, setid] = useState(0);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  let { batch, courses, student, faculty, slots } = state;

  // const a = [
  //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  //   22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  // ];

  const handleclick = (num) => {
    if (_batchExists(batch, num)) {
      setid(num);
    } else {
      setid(0);
    }
  };
  return (
    <>
      <div className="wrapper">
        <div className={id ? "sidebar active" : "sidebar"}>
          <table cellPadding={10} cellSpacing={0}>
            <thead>
              <tr>
                <th>time</th>
                <th>date</th>
                <th>student</th>
                <th>course</th>
                <th>faculty</th>
              </tr>
            </thead>
            <tbody>
              {batch
                .filter((x) => +x.createdAt.toString().split(" ")[2] === +id)
                .map((x) => (
                  <tr>
                    <td>{x._id}</td>
                    <td>{x.createdAt.split(" ").slice(1, 5).join(" ")}</td>
                    <td>{findIArr(student, x.student)}</td>
                    <td>{findIArr(courses, x.course)}</td>
                    <td>{findIArr(faculty, x.faculty)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="calendar">
          {_cal().map((x) => (
            <div
              onClick={(e) => handleclick(x)}
              className={_batchExists(batch, x) ? "item active" : "item"}
            >
              <h1 className="date">{x}</h1>
              <h3>{_batchCount(batch, x)}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
