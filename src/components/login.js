import bgImage from '../images/Home.jpg';

function Login() {
    return (
      <div className="login bg-snow w-4/5 h-4/5 rounded-md">
          <img className="bgimage rounded-t-md w-full h-32" src={bgImage} alt="Home"/>
      </div>
    );
}
export default Login