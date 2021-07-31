import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
function Private(props) {
  let state = useSelector((s) => s);

  if (props.expected === state.role) {
    return <Route exact path={props.src} component={props.page} />;
  } else {
    return <Redirect to="/" />;
  }
}
export default Private;
