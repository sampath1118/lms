import React from "react";
import { useSelector } from "react-redux";
function Loader() {
  let state = useSelector((s) => s);
  let status = state.status;
  if (status) {
    return (
      <div className="loader-bg">
        <div className="loader"></div>
      </div>
    );
  } else {
    return null;
  }
}

export default Loader;
