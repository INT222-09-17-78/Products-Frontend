import "./App.css";
import "./styles/output.css";
import Home from "./pages/home";
import FormRegister from "./components/formregis";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FormLogin from "./components/formlogin";
const App = () => {
  return (
    <div className="App w-screen h-screen">
      <Router>
        <Route path="/" component={Home}></Route>
      </Router>
    </div>
  );
};

export default App;
