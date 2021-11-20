import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate
} from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";

function App() {

  // const {user} = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:username" element={<Profile/>}/>
      </Routes>
    </Router>
    )
}

export default App;


// function App() {

//   const {user} = useContext(AuthContext)
//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/">{user ? <Home /> : <Login />}</Route>
//         <Route path="/login">{user ? <Navigate to="/" /> : <Login />}</Route>
//         <Route path="/register">{user ? <Navigate to="/" /> : <Register />}</Route>
//         <Route path="/profile/:username" element={<Profile/>}/>
//       </Routes>
//     </Router>
//     )
// }
