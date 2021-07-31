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
        <Route exact path="/admin/home" component={Home} />
        <Route exact path="/admin/admin" component={Admin} />
        <Route exact path="/admin/faculty" component={Faculty} />
        <Route exact path="/admin/student" component={Student} />
        <Route exact path="/admin/courses" component={Courses} />
        <Route exact path="/admin/slots" component={Slots} />
        <Route exact path="/admin/batch" component={Batch} />
        <Route exact path="/admin/chart" component={Chart} />
        <Route exact path="/admin/graph" component={Graph} />
        <Route exact path="/admin/planner" component={Planner} />
        <Route exact path="/admin/attendence" component={Attendence} />
      </Switch>
    </>
  );
}

export default App;
