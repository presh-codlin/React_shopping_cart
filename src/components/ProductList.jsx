import { React, useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

function ProductList({ data, size, setSize, onAddToCart, isLoggedIn, setErrMessage, setWarning }){
  const [currentItem, setCurrentItem] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [sizeErr, setSizeErr] = useState("Please enter a size value to proceed, only [M, S, L, XL or XXL] are valid");
 
  const openModal = (item) => {
    if(isLoggedIn === true){
      setCurrentItem({... item});
    }else{
      setWarning(true);
      setErrMessage("Please Login to Carry out this action");
      setTimeout(()=>{
        setWarning("");
      }, 5000);
      return;
    }
  }
 
  const handleSizeChange = (e)=>{
    const value = e.target.value;
    const newValue = value.toUpperCase().replace(/[^MSXL]|X{3,}/g, '');
    setCurrentItem({...currentItem, selectedSize: newValue});
    setShowButton(['M', 'S', 'XXL', 'XL', 'L'].includes(newValue));
    if(['M', 'S', 'XXL', 'XL', 'L'].includes(newValue)){
      setSizeErr("");
    }else{
      setSizeErr("Please enter a size value to proceed, only [M, S, L, XL or XXL] are valid");
    }
  }
  const handleQtyChange = (e) =>{
    setCurrentItem({...currentItem, quantity: e.target.value});
  }
  
  const closeModal = ()=>{
    setCurrentItem(null);
  }
  
  const handleAdd = ()=>{
    //if(['M', 'S', 'XXL', 'XL', 'L'].includes(currentItem.selectedSize)){
      onAddToCart(currentItem);
      closeModal();
      setShowButton(false);
      setSizeErr("Please enter a size value to proceed, only [M, S, L, XL or XXL] are valid");
  }
  
  return(
    <>
      <Fade bottom cascade>
        <div className="w-[100%] mb-3 grid grid-cols-[100%] md:grid-cols-[minmax(280px,_48%)_minmax(280px,_48%)] laptop:grid-cols-[minmax(220px,_31.5%)_minmax(220px,_31.5%),_minmax(220px,_31.5%)] desktop:grid-cols-[minmax(204px,_25%)_minmax(204px,_25%)_minmax(204px,_25%)_minmax(204px,_25%)] gap-4">
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
          <Modal isOpen={true} onRequestClose={closeModal} className="fixed flex items-center w-[90%] h-[98%] max-h-[max] md:h-[80%] md:w-[60%] laptop:w-[90%] laptop:h-[500px] laptop:max-h-[500px] bg-white-50 justify-center z-[9000] p-4 md:px-5 md:pt-5 md:pb-3 laptop:p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[900]">
            <span onClick={closeModal} className="fa fa-times absolute top-0 right-0 bg-blue-500 px-3 py-2 rounded-bl-[5px] z-[10] text-[16px] laptop:text-xl text-white-50"></span>
            <Zoom>
              <div className="w-[100%] h-[100%] px-0 laptop:px-4 laptop:py-5 pb-6 flex flex-col laptop:flex-row justify-between items-center">
                <img className="w-[100%] h-[70%] laptop:h-[100%] laptop:w-[40%] mb-3 laptop:mb-0" src={currentItem.image} alt="productImg preview"/>
                <div className="w-[100%] h-[280px] laptop:w-[50%] text-left flex flex-col justify-between gpb-2 laptop:gap-4 laptop:pr-2">
                  <h2 className="text-[16px] line-clamp-1 laptop:text-3xl font-bold text-blue-500 mb-1">{currentItem.title}</h2>
                  <p className="text-sm text-blue-500 line-clamp-2 mb-2">{currentItem.description}</p>
                  <div className="w-[100%] laptop:w-[60%] flex flex-wrap gap-4 items-center justify-between mb-3">
                    <div className="flex items-center w-[max-content] laptop:hidden text-[16px] text-orange-300 font-medium">$ {(currentItem.price * currentItem.quantity).toFixed(2)}</div>
                    <div className="w-[max-content] flex gap-3 items-center text-[16px] text-blue-500 font-medium"> 
                      <label for="qty">Qty:</label>
                      <input type="text" name="qty" value={currentItem.quantity} className="text-blue-500 text-[16px] w-[30px] text-center outline-none" onChange={(e)=> handleQtyChange(e)}/>
                    </div>
                    <div className="w-[max-content] flex gap-3 items-center text-[16px] text-blue-500 font-medium"> 
                      <label for="size">Size:</label>
                      <input type="text" name="size" value={currentItem.selectedSize} className={sizeErr === "" ? "text-blue-500 text-[16px] w-[30px] text-center outline-none" : "text-blue-500 text-xl w-[30px] border-[1px] border-red-700 text-center outline-none"} onChange={(e)=> handleSizeChange(e)}/>
                    </div>
                  </div>
                  <div className="flex w-[100%] flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center hidden laptop:block w-[30%] text-[16px] text-orange-300 font-medium">$ {(currentItem.price * currentItem.quantity).toFixed(2)}</div>
                    {
                      showButton && <button onClick={() => handleAdd()} className="w-[100%] laptop:w-[60%] text-sm laptop:text-sm text-white-50 rounded-[5px] px-5 py-2 laptop:px-4 laptop:py-2 bg-orange-300 hover:text-orange-300 hover:bg-white-50 hover:border-[1.5px] hover:border-orange-300">Add to Cart</button>
                    }
                    {
                      sizeErr && <p className="text-red-700 text-[16px] laptop:text-xl">{sizeErr}</p>
                    }
                  </div>
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