import "./App.css";
import "./styles/output.css";
import BaseLogin from "./components/baselogin.js";

const Logo = () => (
  <div className="logo w-24 h-24 bg-whitesmoke rounded-full text-2xl font-bold text-cyan-blue flex items-center justify-center absolute z-10 mt-12">LOGO</div>
);
function App() {
  return (
    <div className="App bg-cyan-blue w-screen h-screen flex justify-center">
      <Logo />
      <BaseLogin/>
    </div>
  );
}

export default App;
