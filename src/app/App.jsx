import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import News from "./pages/News";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">CISR ADMIN</Typography>
        </Toolbar>
      </AppBar>
      <div className="flex">
        <div className="min-w-[200px]">
          <Sidebar />
        </div>
        <Switch>
          <Route exact path="/" component={News} />
          <Route path="/news" component={News} />
          <Route component={"NotFound"} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
