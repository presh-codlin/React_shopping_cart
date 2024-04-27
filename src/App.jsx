import {React, useState, useEffect} from 'react';
import ProductList from './components/ProductList.jsx';
import FilterComponent from './components/FilterComponent.jsx';
import products from './products.js';
import CartComponent from './components/CartComponent.jsx';
import Checkout from './components/Checkout.jsx';
import AuthPage from './components/AuthPage.jsx';
import OrderHistory from './components/OrderHistory';

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
  const [openOrderHistory, setOpenOrderHistory] = useState(false);
  
 
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
   console.log(item);
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
     }, 2000);
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
    tempArr[ind].quantity += d;
    if(tempArr[ind].quantity === 0){
      tempArr[ind].quantity = 1;
    }
    setCart([...tempArr]);
  }
 
  const toggleCart = () => {
   setShowCart(true);
  }
  
  const handleProceed = ()=>{
   setShowCheckout(true);
  }
  
 const  createOrderNotification = (order)=>{
      setWarning(false);
      setSuccessMessage(`Hey ${order.name} your order was created successfully`);
      setTimeout(()=>{
        setWarning("");
      }, 2000);
  }

  return (
    <div className="w-[100vw] h-[100vh] flex flex-wrap justify-center">
      <header className="text-white-50 bg-blue-500 flex w-[100vw] justify-center items-center p-3 laptop:p-5 h-[10vh] md:h-[5vh]">
        <div className="w-[100%] laptop:max-w-[980px] desktop:max-w-[1150px] flex items-center justify-between h-[100%] text-xl">
          <a href="/" className="text-xl">Premium Wears</a>
          <div>
            <span onClick={()=>toggleCart()} className={showCart ? "fa fa-shopping-cart px-[18px] py-[5px] text-orange-300 text-xl laptop:hidden" : "fa fa-shopping-cart px-[18px] py-[5px] text-white-50 text-xl laptop:hidden"}></span>
            <span onClick={()=> setShowLogin(true)} className="fa fa-user px-[18px] py-[5px] text-white-50 text-xl"></span>
            <span onClick={()=>setOpenOrderHistory(true)} className="fa fa-user-tie px-[18px] py-[5px] text-white-50 text-xl"></span>
          </div>
        </div>
      </header>
      {
        openOrderHistory ? <OrderHistory/> : (
          <div className="w-[100%] h-[80vh] md:h-[90vh] flex-col items-center bg-white-50 p-5 overflow-auto md:overflow-visible">
            <nav className="bg-white-100 laptop:ml-0 w-[100%] flex flex-col justify-center md:flex-row laptop:flex-row md:items-center laptop:row-gap-5 laptop:justify-between mb-5 px-5 pt-3 pb-0 md:pb-3">
              <h4 className="text-left text-blue-500 text-xl laptop:text-2xl font-bold w-[100%] max-w-[300px]">Filter Product By:</h4>
              <FilterComponent count={productData.length} size={size} productData={products} productSort={productData} onSizeFilterChange={handleSizeFilterChange} category={category} onCategoryFilterChange={handleCategoryFilterChange} color={color} onColorFilterChange={handleColorFilterChange} sort={sort} onSortFilterChange={handleSortFilterChange} />
            </nav>
            <div className="laptop:max-w-[980px] desktop:max-w-[1150px] w-[100%] h-[100%] md:h-[95%] flex justify-between items-start">
              <main className="h-[100%] flex w-100 laptop:w-[74%] desktop:w-[76%] flex-col items-center pb-2">
                <h1 className="mb-5 text-left text-xl">{productData.length } {productData.length === 1 ? "Product" : "Products"} Available</h1>
                <div className="w-[100%] md:h-[90%] flex flex-col items-center mb-5 md:overflow-auto">
                  {
                   productData.length === 0 ? <div>Product Not Available at the moment</div> : <ProductList data={productData} size={sizeSelected} setSize={setSizeSelected} onQuantityChange={handleQuantityChange} onAddToCart={handleAddTocart}/>
                  }
                </div>
              </main>
              <aside className={showCart ? "bg-white-700 laptop:bg-white-100 sm:fixed sm:top-[0px] w-[100%] h-[100%] sm:left-[0px] laptop:mr-0 flex laptop:w-[25%] desktop:w-[22%] laptop:max-w-[30%] flex-col items-center" : "bg-white-700 laptop:bg-white-100 sm:fixed sm:top-[0px] w-[90%] h-[100%] sm:left-[-500px] laptop:mr-0 flex laptop:w-[25%] desktop:w-[22%] laptop:max-w-[30%] flex-col items-center"}>
                <i className="fa fa-times absolute right-4 top-4 laptop:hidden text-orange-300 text-2xl" onClick={()=> setShowCart(false) }></i>
                <div className={showCart ? "bg-white-100 sm:fixed sm:top-[0px] w-[80%] h-[100%] sm:left-[0px] laptop:mr-0 flex laptop:w-[100%] flex-col items-center p-4 gap-[20px] overflow-auto sm:border-[1px]" : "bg-white-100 sm:fixed sm:top-[0px] w-[80%] h-[100%] sm:left-[-500px] laptop:mr-0 flex laptop:w-[100%] flex-col items-center p-4 gap-3 overflow-auto"}> 
                  <div className="w-[100%]">
                    {
                      cart.length === 0 ? <div className="w-[100%] h-[100%] flex items-center justify-center text-white-[#797979] text-xl">Your cart is Empty</div> : <CartComponent cart={cart} onRemoveItem={handleRemoveItem} size={sizeSelected} setSize={setSizeSelected} onQuantityChange={handleQuantityChange} onClearCart={handleClearCart} onProceed={handleProceed}/>
                    }
                  </div>
                  <div className="w-[100%]">
                    {
                      showCheckout ? <Checkout cartItems={cart} createOrderNotification={createOrderNotification}/> : ""
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
      <footer className="text-white-50 text-xl bg-blue-500 flex w-[100vw] h-[10vh] md:h-[5vh] justify-center items-center laptop:p-5 py-3 mb-0 mt-2 md:mt-0">
        All Rights Reserved
      </footer>
      {
        warning === "" ? <div className="text-[16px] w-[max-centent] py-[10px] px-[12px] z-[900] rounded-tl-[4px] rounded-bl-[4px] bg-red-500 text-white-50 border-[1px] border-white-150 flex items-center justify-center fixed top-[50px] right-0 hidden"></div> : warning ? <div className="text-[16px] w-[max-centent] py-[10px] px-[12px] z-[900] rounded-tl-[4px] rounded-bl-[4px] bg-red-500 text-white-50 border-[1px] border-white-150 flex items-center justify-center fixed top-[0px] laptop:top-[50px] right-0">Warning: {errMessage}</div>  : <div className="text-[16px] w-[max-centent] py-[10px] px-[12px] z-[900] rounded-tl-[4px] rounded-bl-[4px] bg-green-500 text-white-50 border-[1px] border-white-150 flex items-center justify-center fixed top-[0px] laptop:top-[50px] right-0">Success: {successMessage}</div>
      }
    </div>
  )
}

export default App;
