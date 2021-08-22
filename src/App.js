import "./App.css";
import "./styles/output.css";
import Home from "./pages/home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Brands from "./pages/brands";
import FormLogin from "./components/formlogin";
import FormRegister from "./components/formregis";
const App = () => {
  return (
    <div className="App w-screen h-screen">
      <Router>
        <Switch>
          <Route path="/brands" component={Brands}/>
          <Home />
        </Switch>
      </Router>

      {/* <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router> */}
    </div>
  );
};

export default App;
