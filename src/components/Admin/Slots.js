import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { _get, _post, _edit, _delete, _patch } from "../../services";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [ob1, setob1] = useState({
    name: "",
  });
  const [ob2, setob2] = useState({
    _id: "",
    name: "",
  });

  let a = state.slots;

  const handleChange1 = (e) => {
    let { placeholder, value } = e.target;
    setob1({ ...ob1, [placeholder]: value });
  };

  const handleChange2 = (e) => {
    let { placeholder, value } = e.target;
    setob2({ ...ob2, [placeholder]: value });
  };

  const insert = (e) => {
    e.preventDefault();
    dispatch({ type: "loader-true" });
    _post("admin/slots", ob1)
      .then((d) => (d.status ? d.data : Promise.reject("unable to add")))
      .then((d) => [...a, d])
      .then((d) => dispatch({ type: "slots", payload: d }))
      .then(dispatch({ type: "loader-false" }))
      .then(notification.open({ message: "new slots added" }))
      .then((d) => setob1({ name: "" }))
      .catch((e) => {
        dispatch({ type: "loader-false" });
        notification.open({ message: "unable to add slots" });
      });
  };
  const edit = (x) => {
    setob2(x);
  };
  const update = (e) => {
    e.preventDefault();
    dispatch({ type: "loader-true" });
    _patch("admin/slots/" + ob2._id, ob2)
      .then((d) => (d.status ? d.data : Promise.reject(d.data)))
      .then((d) => a.map((x) => (x._id === ob2._id ? ob2 : x)))
      .then((d) => {
        dispatch({ type: "loader-false" });
        dispatch({ type: "slots", payload: d });
        notification.open({ message: "slots updated" });
        setob2({
          _id: "",
        });
      })
      .catch((e) => {
        dispatch({ type: "loader-false" });
        console.log(e);
        notification.open({ message: e.message });
      });
  };
  const del = (id) => {
    dispatch({ type: "loader-true" });
    _delete("admin/slots/" + id)
      .then((d) => (d.status ? d.data : Promise.reject(d.data)))
      .then((d) => a.filter((x) => x._id !== id))
      .then((d) => {
        dispatch({ type: "loader-false" });
        dispatch({ type: "slots", payload: d });
        notification.open({ message: "deleted slots successfully" });
      })
      .catch((e) => {
        dispatch({ type: "loader-false" });
        notification.open({ message: JSON.stringify(e) });
      });
  };

  useEffect(() => {
    // starts
    let status = true;
    if (status) {
      const loadAll = () => {
        dispatch({ type: "loader-true" });
        _get("admin/slots")
          .then((d) => (d.status ? d.data : Promise.reject(d.data)))
          .then((d) => {
            dispatch({ type: "loader-false" });
            dispatch({ type: "slots", payload: d });
            notification.open({
              message: "all daata fetched for slots from api",
            });
          })
          .catch((e) => {
            dispatch({ type: "loader-false" });
            notification.open({ message: JSON.stringify(e) });
          });
      };

      loadAll();
    }
    // ends
    status = false;
  }, []);
  return (
    <>
      <div className="wrapper">
        <form onSubmit={insert}>
          <h2>New slots</h2>
          <input value={ob1.name} placeholder="name" onChange={handleChange1} />
          <button>Insert</button>
        </form>

        {ob2._id && (
          <form onSubmit={update}>
            <h2>Edit slots</h2>
            <input
              value={ob2.name}
              placeholder="name"
              onChange={handleChange2}
            />
            <button>Update</button>
          </form>
        )}
        <h1>All slots {a.length}</h1>
        <table cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>name</th>
              <th>createdAt</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {a.map((x) => (
              <tr key={x._id}>
                <td>{x.name}</td>
                <td>{x.createdAt}</td>
                <td>
                  <button className="e" onClick={(e) => edit(x)}>
                    Edit
                  </button>
                  <button className="d" onClick={(e) => del(x._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
