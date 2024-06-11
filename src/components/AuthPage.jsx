import {React, useState} from 'react';
import Register from '../components/Auth/Register.jsx';
import Login from '../components/Auth/Login.jsx';

function AuthPage({setShowLogin}) {
  const [activeAuth, setActiveAuth] = useState("");
  return(
    <div className="w-[100%] max-w-[500px] flex justify-center gap-4 items-center px-3 pt-8 pb-10 relative bg-white-100 overflow-hidden rounded-[5px]">
      <span onClick={()=> setShowLogin(false)} className="fa fa-times absolute top-0 right-0 bg-blue-500 px-3 py-2 rounded-bl-[5px] text-white-50"></span>
      {
        activeAuth === "register" ? <Register setActiveAuth={setActiveAuth}/> : activeAuth === "login" ?  <Login setActiveAuth={setActiveAuth}/> : (
        <div className="w-[90%] flex flex-col justify-between gap-4 items-center">
          <p className="text-orange-300 text-center text-[16px] laptop:text-xl mb-2">what would you like to do?</p>
          <button onClick={()=> setActiveAuth("register")} className="w-[100%] laptop:w-[90%] rounded-[5px] px-4 py-2 bg-blue-500 text-xl text-white-50 text-center">Register</button>
          <p className="text-[16px] text-center laptop:text-2xl">or</p>
          <button onClick={()=> setActiveAuth("login")} className="w-[100%] laptop:w-[90%] rounded-[5px] px-4 py-2 bg-blue-500 text-xl text-white-50 text-center">Login</button>
        </div>
        )
      }
    </div>
  )
}

export default AuthPage;