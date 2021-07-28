import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Selection from "./Selection";
import Mood from "./Mood";
import "./App.css";

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const datafromserver = await fetchdata();
      setData(datafromserver);
    };

    getData();
  }, []);

  const fetchdata = async () => {
    const res = await fetch("http://localhost:5000/data");
    const data = await res.json();
    return data;
  };

  return (
    <div>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={() => <Mood data={data} />} />
            <Route
              exact
              path='/admin'
              component={() => <Selection setData={setData} />}
            />
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
};

export default App;
