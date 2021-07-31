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
        <Route exact path="/student/home" component={Home} />
        <Route exact path="/student/admin" component={Admin} />
        <Route exact path="/student/faculty" component={Faculty} />
        <Route exact path="/student/student" component={Student} />
        <Route exact path="/student/courses" component={Courses} />
        <Route exact path="/student/slots" component={Slots} />
        <Route exact path="/student/batch" component={Batch} />
        <Route exact path="/student/chart" component={Chart} />
        <Route exact path="/student/graph" component={Graph} />
        <Route exact path="/student/planner" component={Planner} />
        <Route exact path="/student/attendence" component={Attendence} />
      </Switch>
    </>
  );
}

export default App;
