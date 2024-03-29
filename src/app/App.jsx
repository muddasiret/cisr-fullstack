// App.js
import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./pages/login/Login";
import Home from "./pages/home";

const News = lazy(() => import("./pages/news/News"));
const Events = lazy(() => import("./pages/events/Events"));
const About = lazy(() => import("./pages/about/About"));
const Paper = lazy(() => import("./pages/paper/Paper"));
const NotFound = () => <div>Not Found</div>; // Define a NotFound component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    if (!isLoggedIn && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          path="/login"
          render={(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
        />
        <AppLayout>
          <Suspense fallback={<div>Loading...</div>}>
            {isLoggedIn && (
              <>
                <Route exact path="/" component={Home} />
                <Route path="/news" component={News} />
                <Route path="/events" component={Events} />
                <Route path="/about" component={About} />
                <Route path="/papers" component={Paper} />
              </>
            )}
          </Suspense>
          {/* <Route component={NotFound} /> */}
        </AppLayout>
      </Switch>
    </Router>
  );
}

export default App;
