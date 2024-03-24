import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import News from "./pages/News";
import AppLayout from "./components/AppLayout";
import Playground from "./pages/Playground";

function App() {
  return (
    <Router>
      <AppLayout>
        <Switch>
          <Route exact path="/" component={News} />
          <Route path="/news" component={News} />
          <Route path="/play" component={Playground} />
          <Route component={"NotFound"} />
        </Switch>
      </AppLayout>
    </Router>
  );
}

export default App;
