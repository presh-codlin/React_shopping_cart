import { React, useState } from 'react';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

function ProductList({ data, size, setSize, onAddToCart, onQuantityChange }){
  const [currentItem, setCurrentItem] = useState(null);
  const [sizeErr,setSizeErr] = useState("");
 
  const openModal = (item) => {
    setCurrentItem({... item});
  }
 
  const handleSizeChange = (e)=>{
    setSize(e.target.value);
    if (size !== "M"){
      if(size !== "S"){
        if(size !== "XL"){
          if(size !== "XXL"){
            if(size !== "L"){
              setSizeErr("Unkown size: use a Valid size Letters eg: M,X,S,XL,XXL,L");
            }
          }
        }
      }
    }else{
      setSizeErr("");
    }
  }
  
  const closeModal = ()=>{
    setCurrentItem(null);
  }
  
  const handleAdd = ()=>{
    if(size === ""){
      setSizeErr("Enter a size value");
      return;
    }
    onAddToCart(currentItem);
    closeModal();
  }
  
  return(
    <>
      <Fade bottom cascade>
        <div className="w-[100%] grid grid-cols-[100%] md:grid-cols-[minmax(280px,_48%)_minmax(280px,_48%)] laptop:grid-cols-[minmax(220px,_31.5%)_minmax(220px,_31.5%),_minmax(220px,_31.5%)] desktop:grid-cols-[minmax(204px,_25%)_minmax(204px,_25%)_minmax(204px,_25%)_minmax(204px,_25%)] gap-4">
          {data.map((item) => {
            return(
              <li key={item._id} className="list-none">
                <div className="w-[100%] p-5 rounded-[8px] shadow-[0px_0px_10px_rgba(0,0,0,0.2)] bg-white-150 overflow-hidden border-[1.5px] border-orange-300">
                  <a href="/" className="w-[100%]">
                    <img src={item.image} alt="product_image" className="w-[100%] mb-5 rounded-[8px]"/>
                    <h4 className="text-xl text-blue-500 font-medium mb-2 line-clamp-1 hover:text-orange-300">{item.title}</h4>
                    <p className="text-sm text-blue-500 font-normal mb-5 line-clamp-2">{item.description}</p>
                  </a>
                  <div className="w-[100%] h-[45px] flex justify-between items-center">
                    <div className="text-xl laptop:text-xl text-blue-500 font-medium">$ {item.price}</div>
                    <button onClick={() => openModal(item)} className="text-sm laptop:text-sm text-white-50 rounded-[5px] px-5 py-3 laptop:px-4 laptop:py-2 bg-orange-300 hover:text-orange-300 hover:bg-white-50 hover:border-[1.5px] hover:border-orange-300">Details</button>
                  </div>
                </div>
              </li>
            )
          })}
        </div>
      </Fade>
      {
        currentItem && (
          <Modal isOpen={true} onRequestClose={closeModal}>
            <span onClick={closeModal} className="fa fa-times absolute top-0 right-0 bg-blue-500 px-3 py-2 rounded-bl-[5px] text-white-50"></span>
            <Zoom>
              <div className="w-[100%] h-[100%] px-0 laptop:px-4 pt-5 pb-6 flex flex-col laptop:flex-row justify-between items-center">
                <img className="w-[100%] laptop:w-[40%] mb-4 laptop:mb-0" src={currentItem.image} alt="productImg preview"/>
                <div className="w-[100%] laptop:w-[50%] text-left flex flex-col justify-between gpb-2 laptop:gap-4">
                  <h2 className="text-xl line-clamp-1 laptop:text-3xl font-bold text-blue-500">{currentItem.title}</h2>
                  <h3 className="text-xl laptop:text-2xl font-bold text-orange-300">{currentItem.price}</h3>
                  <p className="text-xl text-blue-500 line-clamp-2">{currentItem.description}</p>
                  <div>
                    <div className="w-[100%] flex items-center">
                      <button onClick={()=>onQuantityChange(currentItem, -1)} className="w-[28%] text-[16px] h-[23px] text-blue-500 text-center border-[1px] border-[#797979] rounded-[4px] flex items-center justify-center">-</button>
                      <span className="w-[44%] text-[16px] text-blue-500 text-center flex items-center justify-center">{currentItem.quantity}</span>
                      <button onClick={()=>onQuantityChange(currentItem, +1)} className="w-[28%] text-[16px] h-[23px] text-blue-500 text-center border-[1px] border-[#797979] rounded-[4px] flex items-center justify-center">+</button>
                    </div>
                    <div className="flex gap-2 items-center text-xl text-blue-500 font-medium w-[max-content]"> 
                      <label for="size">Size:</label>
                      <input type="text" name="size" value={size} className={sizeErr === "" ? "text-blue-500 text-xl w-[30px] text-center outline-none" : "text-blue-500 text-xl w-[30px] border-[1px] border-red-700 text-center outline-none"} onChange={(e)=> handleSizeChange(e)}/>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center w-[50%] text-[16px] laptop:text-[1rem] text-blue-500 font-medium">$ {(currentItem.price * currentItem.quantity).toFixed(2)}</div>
                    <button onClick={() => handleAdd()} className="text-sm laptop:text-sm text-white-50 rounded-[5px] px-5 py-3 laptop:px-4 laptop:py-2 bg-orange-300 hover:text-orange-300 hover:bg-white-50 hover:border-[1.5px] hover:border-orange-300">Details</button>
                  </div>
                  {
                    sizeErr === "" ? "" : <p className="text-red-700 text-sm text-left mt-2">{sizeErr}</p>
                  }
                </div>
              </div>
            </Zoom>
          </Modal>
        )
      }
    </>
  )
}

export default ProductList;