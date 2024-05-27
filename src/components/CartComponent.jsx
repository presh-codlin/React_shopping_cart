import {React, useState, useEffect} from 'react';
import Fade from 'react-reveal/Fade';

function CartComponent({ cart, onRemoveItem, onQuantityChange, onClearCart, onProceed }) {
  const [price, setPrice] = useState(0);
  const [sizeErr,setSizeErr] = useState("");
 
  const handlePrice = () => {
    let totalPrice = cart.reduce((a,c) => a + c.price * c.quantity, 0).toFixed(2);
    setPrice(totalPrice);
  }
  
  useEffect(()=>{
    handlePrice();
  });
 
  return(
    <div className="w-[100%] flex flex-col items-center gap-3">
      <div className="text-center text-xl text-blue-500">You have { cart.length } {cart.length > 1 ? "Products" : "Product"} Available in cart</div>
      <Fade left cascade>
        <div className="w-[100%] flex flex-col items-center gap-3 py-3">
          {
            cart.map((cItem) => {
              return(
                <li key={cItem._id} className="list-none">
                  <div className="w-[100%] px-4 py-3 rounded-[8px] shadow-[0px_0px_10px_rgba(0,0,0,0.2)] bg-white-150 overflow-hidden border-[1.5px] border-orange-300 gap-3 relative">
                    <button onClick={() => onRemoveItem(cItem._id)} className="flex absolute right-0 top-0 items-center justify-center text-sm laptop:text-sm text-white-50 rounded-bl-[5px] px-[10px] py-2 bg-orange-300 hover:text-orange-300 hover:bg-white-50 hover:border-[1.5px] hover:border-orange-300"><i className="fa fa-times"></i></button>
                    <div className="w-[100%] h-[70px] flex items-center">
                      <img src={cItem.image} alt="product_image" className="w-[25%] h-[60px] rounded-[8px]"/>
                      <div className="w-[75%] flex flex-col items-center justify-center pl-3 h-[100%]">
                        <h4 className="text-[16px] text-blue-500 font-medium mb-2 line-clamp-1 hover:text-orange-300">{cItem.title}</h4>
                        <div className="w-[100%] flex items-center">
                          <button onClick={()=>onQuantityChange(cItem, -1)} className="w-[28%] text-[16px] h-[23px] text-blue-500 text-center border-[1px] border-[#797979] rounded-[4px] flex items-center justify-center">-</button>
                          <span className="w-[44%] text-[16px] text-blue-500 text-center flex items-center justify-center">{cItem.quantity}</span>
                          <button onClick={()=>onQuantityChange(cItem, +1)} className="w-[28%] text-[16px] h-[23px] text-blue-500 text-center border-[1px] border-[#797979] rounded-[4px] flex items-center justify-center">+</button>
                        </div>
                      </div>
                    </div>
                    <div className="w-[100%] h-[35px] flex justify-between items-center">
                      <div className="flex items-center w-[50%] text-xl laptop:text-[1rem] text-blue-500 font-medium">$ {(cItem.price * cItem.quantity).toFixed(2)}</div>
                      <div className="flex gap-2 items-center text-xl text-blue-500 font-medium"> 
                        <label for="size">Size:</label>
                        <input type="text" name="size" value={cItem.selectedSize} className={sizeErr === "" ? "text-blue-500 w-[25px] py-1 text-xl text-center outline-none" : "text-blue-500 py-1 w-[25px] text-xl border[1px] border-red-700 text-center outline-none"}/>
                      </div>
                    </div>
                  </div>
                  {
                    sizeErr === "" ? "" : <p className="text-red-700 text-sm text-left mt-2">{sizeErr}</p>
                  }
                </li>
              )
            })
          }
        </div>
      </Fade>
      <div className="w-[100%]">
        <h6 className="w-[100%] flex justify-between items-center h-[40px] text-xl"><span>Total:</span><span>$ {price}</span></h6>
        <div className="w-[100%] flex justify-between items-center h-[40px]">
          <button onClick={()=>onClearCart()} className="text-xl laptop:text-xl text-white-50 rounded-[5px] px-[20px] py-[5px] bg-orange-300 hover:text-orange-300 hover:bg-white-50 hover:border-[1.5px] hover:border-orange-300"><i className="fa fa-trash"></i></button>
          <button onClick={()=>onProceed()} className="text-xl laptop:text-xl text-white-50 w-[70%] rounded-[5px] px-[15px] py-[5px] bg-orange-300 hover:text-orange-300 hover:bg-white-50 hover:border-[1.5px] hover:border-orange-300">Proceed</button>
        </div>
      </div>
    </div>
  )
}

export default CartComponent;