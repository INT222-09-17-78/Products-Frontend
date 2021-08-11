import "./App.css";
import "./styles/output.css";
import Regis from "./components/regis.js";

const Logo = () => (
  <div className="sm:hidden logo w-24 h-24 bg-whitesmoke rounded-full text-2xl font-bold text-cyan-blue flex items-center justify-center absolute z-10 mb-108">LOGO</div>
);
function App() {
  return (
    <div className="App bg-cyan-blue w-screen h-screen flex flex-col items-center overflow-auto justify-center relative">
      <Logo />
      <Regis />
    </div>
  );
}

export default App;
