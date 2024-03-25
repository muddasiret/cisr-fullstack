import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppLayout from "./components/AppLayout";

const News = lazy(() => import("./pages/news/News"));
const Events = lazy(() => import("./pages/events/Events"));
const NotFound = () => <div>Not Found</div>; // Define a NotFound component

function App() {
  return (
    <Router>
      <AppLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={News} />
            <Route path="/news" component={News} />
            <Route path="/events" component={Events} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </AppLayout>
    </Router>
  );
}

export default App;
