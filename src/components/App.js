import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login/index";
import Admin from "./Admin/App";
import Faculty from "./Faculty/App";
import Student from "./Student/App";
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import Private from "./Common/Private";
import Loader from "./Common/Loader";
// import Errpage from "./Common/Errpage";

function App() {
  return (
    <BrowserRouter>
      <Loader />
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Login} />
          <Private expected="admin" src="/admin/:any" page={Admin} />
          <Private expected="faculty" src="/faculty/:any" page={Faculty} />
          <Private expected="student" src="/student/:any" page={Student} />
          {/* <Route component={Errpage} /> */}
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
