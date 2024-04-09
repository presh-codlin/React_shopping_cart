import {React, useState} from 'react';

function Checkout({cartItems, createOrderNotification}){
  const [formField, setFormField] = useState({ email: "", address: "", name: "" });
  const [formErr, setFormErr] = useState({name: "", email: "", address: ""});
  
  const createOrder = (e)=>{
    e.preventDefault();
    
    if(!formField.name && !formField.email && !formField.address){
      setFormErr({...formErr, name: "Name is required", email: "Email is required", address: "Address is required"});
      return;
    }else if(formField.name && !formField.email && !formField.address){
      setFormErr({...formErr, name: "", email: "Email is required", address: "Address is required"});
      return;
    }else if(!formField.name && !formField.email && formField.address){
      setFormErr({...formErr, name: "Name is required", email: "Email is required", address: ""});
      return;
    }else if(!formField.name && formField.email && !formField.address){
      if(!formField.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)){
        setFormErr({...formErr, name: "Name is required", email: "Invalid Email Address", address: "Address is required"});
        return;
      }else{
        setFormErr({...formErr, name: "Name is required", email: "", address: "Address is required"});
        return;
      }
    }
    else if(formField.name && formField.email && !formField.address){
      if(!formField.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)){
        setFormErr({...formErr, name: "", email: "Invalid Email Address", address: "Address is required"});
        return;
      }else{
        setFormErr({...formErr, name: "", email: "", address: "Address is required"});
        return;
      }
    }else if(!formField.name && formField.email && formField.address){
      if(!formField.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)){
        setFormErr({...formErr, name: "Name is required", email: "Invalid Email Address", address: ""});
        return;
      }
      setFormErr({...formErr, name: "Name is required", email: "", address: ""});
      return;
    }else if(formField.name && !formField.email && formField.address){
      setFormErr({...formErr, name: "", email: "Emailis required", address: ""});
      return;
    }else{
      if(!formField.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)){
        setFormErr({...formErr, name: "", email: "Invalid Email Address", address: ""});
        return;
      }else{
        setFormErr({...formErr, name: "", email: "", address: ""});
      }
    }
    
    const order = {
      email: formField.email,
      name: formField.name,
      address: formField.address,
      cartItems: cartItems,
    }
    createOrderNotification(order);
  }
  
  return (
    <div className="w-[100%] flex flex-col items-center pt-[20px]">
      <form onSubmit={createOrder} className="w-[100%]">
        <ul className="w-[100%] flex flex-col items-center gap-3">
          <li className="list-none w-[100%]">
            <label className="text-xl text-blue-500 font-medium">Name:</label>
            <input type="text" placeholder="Name" value={formField.name} onChange={(e) => setFormField({...formField, name: e.target.value})} className={formErr.name === "Name is required" ? "w-[100%] outline-none px-3 py-[8px] text-[16px] laptop:text-xl text-blue-500 border-[2px] border-red-600" : "w-[100%] outline-none px-3 py-[8px] text-[16px] laptop:text-xl text-blue-500 border-none"}/>
            <p className="text-xl text-red-500 font-normal pt-2">{formErr.name}</p>
          </li>
          <li className="list-none w-[100%]">
            <label className="text-xl text-blue-500 font-medium pl-[3px]">Email:</label>
            <input type="text" placeholder="Email" value={formField.email} onChange={(e) => setFormField({...formField, email: e.target.value})} className={formErr.email !== "" ? "w-[100%] outline-none px-3 py-[8px] text-[16px] laptop:text-xl text-blue-500 border-[2px] border-red-600" : "w-[100%] outline-none px-3 py-[8px] text-[16px] laptop:text-xl text-blue-500 border-none"}/>
            <p className="text-xl text-red-500 font-normal pt-2">{formErr.email}</p>
          </li>
          <li className="list-none w-[100%]">
            <label className="text-xl text-blue-500 font-medium pl-[3px]">Address:</label>
            <input type="text" placeholder="Address" value={formField.address} onChange={(e) => setFormField({...formField, address: e.target.value})} className={formErr.address === "Address is required" ? "w-[100%] outline-none px-3 py-[8px] text-[16px] laptop:text-xl text-blue-500 border-[2px] border-red-600" : "w-[100%] outline-none px-3 py-[8px] text-[16px] laptop:text-xl text-blue-500 border-none"}/>
            <p className="text-xl text-red-500 font-normal pt-2">{formErr.address}</p>
          </li>
          <li className="list-none w-[100%] pt-2">
            <button type="submit" className="text-xl laptop:text-xl text-white-50 w-[100%] rounded-[5px] px-[15px] py-[5px] bg-orange-300 hover:text-orange-300 hover:bg-white-50 hover:border-[1.5px] hover:border-orange-300">Checkout</button>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default Checkout;