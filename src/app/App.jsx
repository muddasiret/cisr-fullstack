import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import News from "./pages/News";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <Router>
      <AppLayout>
        <Switch>
          <Route exact path="/" component={News} />
          <Route path="/news" component={News} />
          <Route component={"NotFound"} />
        </Switch>
      </AppLayout>
    </Router>
  );
}

export default App;
