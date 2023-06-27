

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { app } from "./firebase";
import { auth } from "./firebase";
import Router from "./shared/Router";

function App() {
//   return (
//     <div>
//       <SignIn />
//       <SignUp />
//     </div>
//   );

  return <Router />;
}

export default App;
