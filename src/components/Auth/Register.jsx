import { React, useState } from 'react';
import Fade from 'react-reveal/Fade';

function Register ({setActiveAuth}){
  const [formField, setFormField] = useState({ email: "", name: "", password: "", cpassword: "" });
  const [formErr, setFormErr] = useState({email: "", lname: "", fname: "", password: "", cpassword: ""});
  
  const createOrder = (e)=>{
    e.preventDefault();
  
      //if(!formField.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)){
        
    const order = {
      fname: formField.name,
      email: formField.email,
      password: formField.password,
    }
  }
  
  return (
    <form onSubmit={createOrder} className="w-[90%]">
      <h2 className="text-3xl text-center font-bold text-blue-500">Sign Up</h2>
      <Fade right cascade>
        <ul className="w-[100%] flex flex-col items-center gap-3">
          <li className="list-none w-[100%]">
            <label className="text-[16px] laptop:text-xl text-blue-500 font-medium">Last Name:</label>
            <input type="text" placeholder="Full Name" value={formField.name} onChange={(e) => setFormField({...formField, name: e.target.value})} className={formErr.name === "Name is required" ? "w-[100%] outline-none px-3 py-[8px] text-[16px] laptop:text-xl text-blue-500 border-[2px] border-red-600" : "w-[100%] outline-none px-3 py-[8px] text-[16px] laptop:text-xl text-blue-500 border-none"}/>
            <p className="text-[16px] laptop:text-xl text-red-500 font-normal pt-2">{formErr.name}</p>
          </li>
          <li className="list-none w-[100%]">
            <label className="text-[16px] laptop:text-xl text-blue-500 font-medium pl-[3px]">Email:</label>
            <input type="email" placeholder="Email" value={formField.email} onChange={(e) => setFormField({...formField, email: e.target.value})} className={formErr.email !== "" ? "w-[100%] outline-none px-3 py-[8px] text-[16px] laptop:text-xl text-blue-500 border-[2px] border-red-600" : "w-[100%] outline-none px-3 py-[8px] text-[16px] laptop:text-xl text-blue-500 border-none"}/>
            <p className="text-[16px] laptop:text-xl text-red-500 font-normal pt-2">{formErr.email}</p>
          </li>
          <li className="list-none w-[100%]">
            <label className="text-[16px] laptop:text-xl text-blue-500 font-medium pl-[3px]">Password:</label>
            <input type="password" placeholder="Password" value={formField.password} onChange={(e) => setFormField({...formField, password: e.target.value})} className={formErr.address === "Address is required" ? "w-[100%] outline-none px-3 py-[8px] text-[16px] laptop:text-xl text-blue-500 border-[2px] border-red-600" : "w-[100%] outline-none px-3 py-[8px] text-[16px] laptop:text-xl text-blue-500 border-none"}/>
            <p className="text-[16px] laptop:text-xl text-red-500 font-normal pt-2">{formErr.address}</p>
          </li>
          <li className="list-none w-[100%]">
            <label className="text-[16px] laptop:text-xl text-blue-500 font-medium pl-[3px]">Confirm Password:</label>
            <input type="password" placeholder="Confirm Password" value={formField.cpassword} onChange={(e) => setFormField({...formField, cpassword: e.target.value})} className={formErr.address === "Address is required" ? "w-[100%] outline-none px-3 py-[8px] text-[16px] laptop:text-xl text-blue-500 border-[2px] border-red-600" : "w-[100%] outline-none px-3 py-[8px] text-[16px] laptop:text-xl text-blue-500 border-none"}/>
            <p className="text-[16px] laptop:text-xl text-red-500 font-normal pt-2">{formErr.address}</p>
          </li>
          <li className="list-none w-[100%] pt-2">
            <button type="submit" className="text-[16px] laptop:text-xl laptop:text-xl text-white-50 w-[100%] rounded-[5px] px-[15px] py-[5px] bg-blue-500 hover:text-orange-300 hover:bg-white-50 hover:border-[1.5px] hover:border-orange-300">Register</button>
          </li>
          <p className="text-[16px] laptop:text-xl text-center text-orange-300">Already have an Account? <button onClick={()=> setActiveAuth("login")} className="bg-none border-none outline-none underline">Login</button></p>
        </ul>
      </Fade>
    </form>
  )
}

export default Register;