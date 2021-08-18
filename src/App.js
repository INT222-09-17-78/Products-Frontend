import "./App.css";
import "./styles/output.css";
import Home from "./pages/home";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
