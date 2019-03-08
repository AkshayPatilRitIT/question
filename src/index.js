import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Question from "./component/Question";
import Home from "./component/Home";
import Result from "./component/Result";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const NotFound = () => <h1>Page Not Found!!</h1>;

const App = props => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/question/result" component={Result} exact />
        <Route path="/question/:questionNumber" component={Question} exact />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

render(<App />, document.getElementById("root"));
