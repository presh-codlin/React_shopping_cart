import {React, useState, useEffect} from 'react';
import ProductList from './components/ProductList.jsx';
import FilterComponent from './components/FilterComponent.jsx';
import products from './products.js';
import CartComponent from './components/CartComponent.jsx';
import Checkout from './components/Checkout.jsx';
import AuthPage from './components/AuthPage.jsx';
import OrderHistory from './components/OrderHistory';
import Zoom from 'react-reveal/Zoom';

function App() {
  const localStore = localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : [];
  const [productData, setProductData] = useState(products);
  const [size, setSize] = useState("All");
  const [category, setCategory] = useState("All");
  const [color, setColor] = useState("All");
  const [sort, setSort] = useState("");
  const [sizeSelected, setSizeSelected] = useState("");
  const [cart, setCart] = useState(localStore);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [warning, setWarning] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [openOrderHistory, setOpenOrderHistory] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
 
 const handleSortFilterChange = (sortedProducts, selectedSort) => {
   if(selectedSort === ""){
     //setProductData(productData);
   }else{
     setProductData(sortedProducts);
   }
   setSort(selectedSort);
 }
 
 const handleSizeFilterChange = (filteredProducts, selectedSize) => {
    if(selectedSize === "All"){
      setProductData(products);
    }else{
      setProductData(filteredProducts);
    }
    setSize(selectedSize)
 }
 
 const handleCategoryFilterChange = (filteredCategoryProducts, selectedCategory) => {
   if(selectedCategory === "All"){
      setProductData(products);
    }else{
      setProductData(filteredCategoryProducts);
    }
    setCategory(selectedCategory);
  }

 const handleColorFilterChange = (filteredColorProducts, selectedColor) => {
   if(selectedColor === "All"){
      setProductData(products);
    }else{
      setProductData(filteredColorProducts);
    }
    setColor(selectedColor);
  }
 
 const handleAddTocart = (item) => {
   let isInCart = false;
   cart.forEach((product) => {
     if (item._id === product._id){
       isInCart = true;
     }
   })
   if(isInCart){
     setWarning(true);
     setErrMessage("Product already exist in cart, visit cart page to increase quantity");
     setTimeout(()=>{
       setWarning("");
     }, 5000);
     return;
   }
   setCart([...cart, item]);
   localStorage.setItem("cartItem", JSON.stringify([...cart, item]));
  }
 
 const handleRemoveItem = (id) => {
   const newCart = cart.filter((item) => item._id !== id);
   setCart(newCart);
   localStorage.setItem("cartItem", JSON.stringify(newCart));
  }
 
  const handleClearCart = () =>{
   const empty = [];
   setCart(empty);
   setShowCheckout(false);
   localStorage.setItem("cartItem", JSON.stringify(empty));
  }
 
  const handleQuantityChange = (item, d) => {
   let ind = -1;
    cart.forEach((data, index) => {
      if(data._id === item._id){
        ind = index;
      }
    });
    const tempArr = cart;
    if(d === -1){
      tempArr[ind].quantity--;
    }
    if(d === +1){
      tempArr[ind].quantity++;
    }
    
    if(tempArr[ind].quantity === 0){
      tempArr[ind].quantity = 1;
    }
    setCart([...tempArr]);
  }
 
  const toggleCart = () => {
   setShowCart(true);
  }
  
  const handleProceed = ()=>{
    if(isLoggedIn === true){
      setShowCheckout(true);
    }else{
      setWarning(true);
      setErrMessage("Please Login to Carry out this action");
      setTimeout(()=>{
        setWarning("");
      }, 5000);
      return;
    }
  }
  
 const  createOrderNotification = (order)=>{
      setWarning(false);
      setSuccessMessage(`Hey ${order.name} your order was created successfully`);
      setTimeout(()=>{
        setWarning("");
      }, 5000);
  }

  return (
    <div className="w-[100vw] h-[100vh] flex flex-wrap justify-center">
      <header className="text-white-50 bg-blue-500 flex w-[100vw] justify-center items-center laptop:p-5 h-[10vh] md:h-[5vh]">
        <div className="relative w-[100%] laptop:max-w-[980px] desktop:max-w-[1150px] flex items-center justify-between h-[100%] text-xl">
          <a href="/" className="text-xl">Premium Wears</a>
          <div className="w-[max-content] h-[100%] flex gap-1 items-center">
            <span onClick={()=> setShowLogin(true)} className={isLoggedIn ? "hidden" : "fa fa-user px-[18px] py-[5px] text-white-50 text-xl laptop:text-xl"}></span>
            {
              isLoggedIn ? (
               <div className="flex items-center justify-between">
                  <span onClick={()=>toggleCart()} className={showCart ? "fa fa-shopping-cart px-[18px] py-[5px] text-orange-300 text-[16px]text-xl:text-xl laptop:hidden" : "fa fa-shopping-cart px-[18px] py-[5px] text-white-50 text-[16px] laptop:text-xl laptop:hidden"}></span>
                  <div>
                    <div onClick={()=> setShowLogout(!showLogout)} className="relative rounded-[50%] bg-orange-300 flex items-center justify-center w-[30px] h-[30px] text-white-50 text-[16px] py-2 pt-3 font-bold">Y</div>
                    <div className={showLogout ? "flex flex-col z-[90] items-center gap-3 w-[max-content] px-5 py-3 bg-white-50 absolute top-[130%] right-[18px] shadow-[0px_0px_10px_rgba(0,0,0,0.2)]" : "hidden"}>
                      <div className="flex items-center justify-between gap-2">
                        <div className="rounded-[50%] bg-orange-300 flex items-center justify-center w-[30px] h-[30px] text-white-50 text-[16px] py-2 pt-3 font-bold">Y</div>
                        <span className="text-[16px] text-blue-500 font-bold">Yisrael</span>
                      </div>
                      <p onClick={()=> setIsLoggedIn(false)} className="text-[16px] text-blue-500 font-bold">LOGOUT</p>
                    </div>
                  </div> 
                  <span onClick={()=>setOpenOrderHistory(true)} className="fa fa-user-tie px-[18px] py-[5px] text-white-50 text-[16px] laptop:text-xl"></span>
               </div>
              ) : ""
            }
          </div>
        </div>
      </header>
      {
        openOrderHistory ? <OrderHistory/> : (
          <div className="w-[100%] h-[80vh] md:h-[90vh] flex-col items-center justify-center bg-white-50 p-5 overflow-auto md:overflow-visible">
            <nav className="bg-white-100 laptop:ml-0 w-[100%] flex flex-col justify-center items-between md:flex-row laptop:flex-row md:items-center laptop:row-gap-5 laptop:justify-between mb-5 px-5 pt-3 pb-5 md:pb-3">
              <h4 className="text-left text-blue-500 text-xl laptop:text-2xl font-bold mb-4 laptop:mb-0 w-[100%] max-w-[300px]">Filter Product By:</h4>
              <FilterComponent count={productData.length} size={size} productData={products} productSort={productData} onSizeFilterChange={handleSizeFilterChange} category={category} onCategoryFilterChange={handleCategoryFilterChange} color={color} onColorFilterChange={handleColorFilterChange} sort={sort} onSortFilterChange={handleSortFilterChange} />
            </nav>
            <div className="laptop:max-w-[980px] desktop:max-w-[1150px] w-[100%] h-[100%] md:h-[95%] flex justify-between items-start">
              <main className="h-[100%] flex w-100 laptop:w-[74%] desktop:w-[76%] flex-col items-center pb-2">
                <h1 className="mb-5 text-left text-xl">{productData.length } {productData.length === 1 ? "Product" : "Products"} Available</h1>
                <div className="w-[100%] md:h-[90%] flex flex-col items-center mb-5 md:overflow-auto">
                  {
                   productData.length === 0 ? <div>Product Not Available at the moment</div> : <ProductList data={productData} size={sizeSelected} setSize={setSizeSelected} onAddToCart={handleAddTocart} isLoggedIn={isLoggedIn} setErrMessage={setErrMessage} setWarning={setWarning}/>
                  }
                </div>
              </main>
              <aside className={showCart ? "bg-white-700 laptop:bg-white-100 sm:fixed sm:top-[0px] w-[100%] h-[100%] sm:left-[0px] laptop:mr-0 flex laptop:w-[25%] desktop:w-[22%] laptop:max-w-[30%] flex-col items-center" : "bg-white-700 laptop:bg-white-100 sm:fixed sm:top-[0px] w-[90%] h-[100%] laptop:h-[96%] sm:left-[-110%] laptop:mr-0 flex laptop:w-[25%] desktop:w-[22%] laptop:max-w-[30%] flex-col items-center"}>
                <i className="fa fa-times absolute right-4 top-4 laptop:hidden text-orange-300 text-2xl" onClick={()=> setShowCart(false) }></i>
                <div className={showCart ? "bg-white-100 sm:fixed sm:top-[0px] w-[80%] h-[100%] sm:left-[0px] laptop:mr-0 flex laptop:w-[100%] flex-col items-center p-4 gap-[20px] overflow-auto sm:border-[1px]" : "bg-white-100 sm:fixed sm:top-[0px] w-[80%] h-[100%] sm:left-[-110%] laptop:mr-0 flex laptop:w-[100%] flex-col items-center p-4 gap-3 overflow-auto"}> 
                  <div className="w-[100%]">
                    {
                      cart.length === 0 ? <div className="w-[100%] h-[100%] flex items-center justify-center text-white-[#797979] text-xl">Your cart is Empty</div> : <CartComponent cart={cart} onRemoveItem={handleRemoveItem} size={sizeSelected} setSize={setSizeSelected} onQuantityChange={handleQuantityChange} onClearCart={handleClearCart} onProceed={handleProceed} />
                    }
                  </div>
                  <div className="w-[100%]">
                    {
                      showCheckout ? <Checkout cartItems={cart} createOrderNotification={createOrderNotification} isLoggedIn={isLoggedIn} setErrMessage={setErrMessage} setWarning={setWarning}/> : ""
                    }
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )
      }
      <div className={showLogin ? "w-[100vw] h-[100vh] bg-white-700 flex justify-center items-center fixed top-0 left-0" : "w-[100vw] h-[100vh] bg-white-700 flex justify-center items-center fixed top-0 left-0 hidden"}>
        {
          showLogin ? <AuthPage setShowLogin={setShowLogin}/> : ""
        }
      </div>
      <footer className="text-white-50 text-xl bg-blue-500 flex w-[100vw] h-[10vh] md:h-[5vh] justify-center items-center laptop:p-5 py-3 mb-0 z-[90]">
        All Rights Reserved
      </footer>
      {
        warning === "" ? <div className="text-[16px] w-[max-centent] py-[10px] px-[12px] z-[900] rounded-tl-[4px] rounded-bl-[4px] bg-red-500 text-white-50 border-[1px] border-white-150 flex items-center justify-center fixed top-[50px] right-0 hidden"></div> : warning ? ( 
        <div className="w-full h-full z-[90000] bg-white-700 text-white-50 flex items-center justify-center fixed top-[0px] left-0">
          <Zoom>
            <div className="w-[300px] h-[max-content] bg-white-50 pb-2 rounded-bl-[4px] rounded-br-[4px] flex flex-col items-center">
              <div className="bg-red-500 w-[100%] px-3 h-[50px] flex items-center justify-center text-[16px] laptop:text-xl text-white-50">Error Message</div>
              <div className="w-[100%] px-3 py-3 text-center text-[16px] laptop:text-xl text-blue-500">{errMessage}</div>
              <button onClick={()=>setWarning("")} className="bg-red-500 rounded-3 px-3 py-2 text-center text-white-50 text-[16px]">Close</button>
            </div>
          </Zoom>
        </div> ) : ( 
        <div className="w-full h-full z-[90000] bg-white-700 text-white-50 flex items-center justify-center fixed top-[0px] left-0">
          <Zoom>
            <div className="w-[300px] h-[max-content] bg-white-50 pb-2 rounded-bl-[4px] rounded-br-[4px] flex flex-col items-center">
              <div className="bg-green-500 w-[100%] px-3 h-[50px] flex items-center justify-center text-[16px] laptop:text-xl text-white-50">Error Message</div>
              <div className="w-[100%] px-3 py-3 text-center text-[16px] laptop:text-xl text-blue-500">{errMessage}</div>
              <button onClick={()=>setWarning("")} className="bg-green-500 rounded-3 px-3 py-2 text-center text-white-50 text-[16px]">Close</button>
            </div>
          </Zoom>
        </div> 
        )
      }
    </div>
  )
}

export default App;
