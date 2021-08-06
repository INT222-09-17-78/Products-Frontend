import "./App.css";
import "./styles/output.css";
import Regis from "./components/regis.js";

const Logo = () => (
  <div className="sm:hidden logo w-24 h-24 bg-whitesmoke rounded-full absolute top-4 text-2xl font-bold text-cyan-blue flex items-center justify-center">LOGO</div>
);
function App() {
  return (
    <div className="App bg-cyan-blue w-screen h-screen flex justify-center items-center">
      <Logo />
      <Regis />
    </div>
  );
}

export default App;
