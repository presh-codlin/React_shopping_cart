import {React, useState, useEffect} from 'react';
import ProductList from './components/ProductList.jsx';
import FilterComponent from './components/FilterComponent.jsx';
import products from './products.js';
import CartComponent from './components/CartComponent.jsx';

function App() {
  const localStore = localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : [];
  const [productData, setProductData] = useState(products);
  const [size, setSize] = useState("All");
  const [category, setCategory] = useState("All");
  const [color, setColor] = useState("All");
  const [sort, setSort] = useState("");
  const [cart, setCart] = useState(localStore);
  const [showCart, setShowCart] = useState(false);
  const [warning, setWarning] = useState(false);
 
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
     setTimeout(()=>{
       setWarning(false);
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
   setShowCart(!showCart);
 }

  return (
    <div className="w-[100vw] min-h-[99vh] flex flex-wrap">
      <header className="text-white-50 bg-blue-500 flex w-[100vw] justify-center items-center p-3 laptop:p-5">
        <div className="w-[100%] laptop:max-w-[980px] desktop:max-w-[1150px] flex items-center justify-between h-[100%] text-xl">
          <a href="/">Premium Wears</a>
          <span onClick={()=>toggleCart()} className={showCart ? "px-[18px] py-[5px] text-orange-300 text-xl laptop:hidden" : "px-[18px] py-[5px] text-white-50 text-xl laptop:hidden"}>Cart</span>
        </div>
      </header>
      <div className="w-[100%] h-[100vh] overflow-auto flex flex-col items-center bg-white-50 p-5">
        <div className="laptop:max-w-[980px] desktop:max-w-[1150px] w-[100%] flex flex-wrap h-[100vh]">
          <nav className="bg-white-100 laptop:ml-0 w-[100%] h-[90px] flex flex-col justify-center md:flex-row laptop:flex-row md:items-center laptop:row-gap-5 laptop:justify-between mb-5 px-5 pt-3 pb-0 md:pb-3">
            <h4 className="text-left text-blue-500 text-xl laptop:text-2xl font-bold w-[100%] max-w-[300px]">Filter Product By:</h4>
            <FilterComponent count={productData.length} size={size} productData={products} productSort={productData} onSizeFilterChange={handleSizeFilterChange} category={category} onCategoryFilterChange={handleCategoryFilterChange} color={color} onColorFilterChange={handleColorFilterChange} sort={sort} onSortFilterChange={handleSortFilterChange} />
          </nav>
          <main className="h-100 flex w-100 laptop:w-[75%] flex-col items-center">
            <h1 className="mb-5 text-left text-xl">{productData.length } {productData.length === 1 ? "Product" : "Products"} Available</h1>
            <div className="w-[100%] flex flex-col items-center mb-5">
              {
                productData.length === 0 ? <div>Product Not Available at the moment</div> : <ProductList data={productData} onAddToCart={handleAddTocart}/>
              }
            </div>
          </main>
          <aside className={showCart ? "bg-white-100 sm:fixed sm:top-[0px] w-[250px] sm:left-[0px] h-[100%] laptop:mr-0 flex laptop:w-[25%] flex-col items-center p-3 gap-3 overflow-auto sm:border-[1px]" : "bg-white-100 sm:fixed sm:top-[0px] w-[250px] sm:left-[-500px] h-[100%] laptop:mr-0 flex laptop:w-[25%] flex-col items-center p-3 gap-3 overflow-auto"}>
            {
              cart.length === 0 ? <div className="w-[100%] h-[100%] flex items-center justify-center text-white-[#797979] text-xl">Your cart is Empty</div> : <CartComponent cart={cart} onRemoveItem={handleRemoveItem} onQuantityChange={handleQuantityChange} onClearCart={handleClearCart}/>
            }
            {
              warning && <div className="text-[16px] w-[max-centent] py-[10px] px-[12px] z-[900] rounded-tl-[4px] rounded-bl-[4px] bg-red-500 text-white-50 border-[1px] border-white-150 flex items-center justify-center fixed top-[50px] right-0">Warning: Product already exist in Cart</div>
            }
          </aside>
        </div>
      </div>
      <footer className="text-white-50 text-xl bg-blue-500 flex w-[100vw] justify-center items-center laptop:p-5 py-3 mb-0">
        All Rights Reserved
      </footer>
    </div>
  )
}

export default App;
