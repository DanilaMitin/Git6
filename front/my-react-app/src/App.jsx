import {BrowserRouter, Routes, Route} from "react-router";
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from "./pages/Home.jsx";
import Films from "./pages/Films.jsx";
import Profile from "./pages/Profile.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import AdminNews from "./pages/AdminNews.jsx";
import AdminFilms from "./pages/AdminFilms.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminBooking from "./pages/AdminBooking.jsx";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/login" element = {<Login />}></Route>
        <Route path = "/register" element = {<Register />}></Route>
        <Route path = "/" element = {<Home />}></Route>
        <Route path = "/films" element = {<Films />}></Route>
        <Route path = "/profile" element = {<Profile />}></Route>
        <Route path = "/updateProfile" element = {<UpdateProfile />}></Route>
        <Route path = "/updatePassword" element = {<UpdatePassword />}></Route>
        <Route path = "/adminNews" element = {<AdminNews />}></Route>
        <Route path = "/adminFilms" element = {<AdminFilms />}></Route>
        <Route path = "/adminUsers" element = {<AdminUsers />}></Route>
        <Route path = "/adminBooking" element = {<AdminBooking />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App
