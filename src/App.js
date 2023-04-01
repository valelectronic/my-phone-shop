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
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./Pages/CreateListing";

function App() {
  return (
    <>
     <Router>
      <Header/>
      <Routes>
<Route path="/" element ={<Home/>}/>
<Route path="/profile" element = {<PrivateRoute/>}>
<Route path="/profile" element ={<Profile/>}/>
</Route>

<Route path="/forgot_password" element ={<ForgotPassword/>}/>
<Route path="/sign_in" element ={<SignIn/>}/>
<Route path="/sign_up" element ={<SignUp/>}/>
<Route path="/offers" element ={<Offers/>}/>
<Route path="create_listing" element = {<PrivateRoute/>}>
<Route path="/create_listing" element ={<CreateListing/>}/>
</Route>

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
