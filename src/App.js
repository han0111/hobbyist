import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { app } from "./firebase";
import { auth } from "./firebase";

function App() {
  return (
    <div>
      <SignIn />
      <SignUp />
    </div>
  );
}

export default App;
