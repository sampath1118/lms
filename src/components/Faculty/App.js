import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import Faculty from "./Faculty";
import Student from "./Student";
import Courses from "./Courses";
import Slots from "./Slots";
import Batch from "./Batch";
import Chart from "./Chart";
import Graph from "./Graph";
import Planner from "./Planner";
import Attendence from "./Attendence";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/faculty/home" component={Home} />
        <Route exact path="/faculty/admin" component={Admin} />
        <Route exact path="/faculty/faculty" component={Faculty} />
        <Route exact path="/faculty/student" component={Student} />
        <Route exact path="/faculty/courses" component={Courses} />
        <Route exact path="/faculty/slots" component={Slots} />
        <Route exact path="/faculty/batch" component={Batch} />
        <Route exact path="/faculty/chart" component={Chart} />
        <Route exact path="/faculty/graph" component={Graph} />
        <Route exact path="/faculty/planner" component={Planner} />
        <Route exact path="/faculty/attendence" component={Attendence} />
      </Switch>
    </>
  );
}

export default App;
