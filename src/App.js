
import './App.css';
import { getAuth } from "firebase/auth";
import app from './firebase/firebase.init';
import ReactBootstrap from './components/ReactBootstrap/ReactBootstrap';

const auth = getAuth(app)

const handleSubmit = (event) =>{
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;
  console.log(email, password);
}

const handleEmailFieldBlur = event =>{
  console.log(event.target.value)
}
const handlePasswordFieldBlur = event =>{
  console.log(event.target.value)
}



function App() {
  return (
    <div >
      {/* <form onSubmit={handleSubmit}>
        <input onBlur={handleEmailFieldBlur} type="email" name="email" id="" placeholder ='your email' />
        <br></br>
        <input onBlur={handlePasswordFieldBlur} type="password" name="password" id="" placeholder ='your password'/>
        <br></br>
        <button>Register</button>
        
      </form> */}
      <ReactBootstrap></ReactBootstrap>
    </div>
  );
}

export default App;
