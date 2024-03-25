// App.js
import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./pages/login/Login";

const News = lazy(() => import("./pages/news/News"));
const Events = lazy(() => import("./pages/events/Events"));
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
                <Route exact path="/" component={News} />
                <Route path="/news" component={News} />
                <Route path="/events" component={Events} />
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
