import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Offers from "./Pages/Offers";
import Header from "./components/Header";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
     <Router>
      <Header/>
      <Routes>
<Route path="/" element ={<Home/>}/>
<Route path="/profile" element ={<Profile/>}/>
<Route path="/forgot_password" element ={<ForgotPassword/>}/>
<Route path="/sign_in" element ={<SignIn/>}/>
<Route path="/sign_up" element ={<SignUp/>}/>
<Route path="/offers" element ={<Offers/>}/>
      </Routes>
     </Router>
     <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </>
  );
}

export default App;
