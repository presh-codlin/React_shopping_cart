import {React, useState, useEffect} from 'react';
import ProductList from './components/ProductList.jsx';
import FilterComponent from './components/FilterComponent.jsx';
import products from './products.js';

function App() {
  const [productData, setProductData] = useState(products);
  const [size, setSize] = useState("All");
  const [category, setCategory] = useState("All");
  const [color, setColor] = useState("All");
  const [sort, setSort] = useState("");
 
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

  return (
    <div className="w-[100vw] min-h-[99vh] flex flex-wrap">
      <header className="text-white-50 bg-blue-500 flex w-[100vw] justify-center items-center p-5">
        <div className="w-[100%] laptop:max-w-[980px] desktop:max-w-[1150px] flex items-center h-[100%]">
          <a href="/">Premium Wears</a>
        </div>
      </header>
      <div className="w-[100%] h-[100vh] overflow-scroll flex flex-col items-center bg-white-50 p-5">
        <div className="laptop:max-w-[980px] desktop:max-w-[1150px] w-[100%] flex flex-wrap h-[100vh]">
          <nav className="bg-white-100 laptop:ml-0 w-[100%] h-[90px] flex flex-col justify-center md:flex-row laptop:flex-row md:items-center laptop:row-gap-5 laptop:justify-between mb-5 px-5 pt-3 pb-0 md:pb-3">
            <h4 className="text-left text-blue-500 text-xl laptop:text-2xl font-bold w-[100%] max-w-[300px]">Filter Product By:</h4>
            <FilterComponent count={productData.length} size={size} productData={products} productSort={productData} onSizeFilterChange={handleSizeFilterChange} category={category} onCategoryFilterChange={handleCategoryFilterChange} color={color} onColorFilterChange={handleColorFilterChange} sort={sort} onSortFilterChange={handleSortFilterChange} />
          </nav>
          <main className="h-100 flex w-100 laptop:w-[80%] flex-col items-center">
            <h1 className="mb-5 text-left">{productData.length } {productData.length === 1 ? "Product" : "Products"} Available</h1>
            <div className="w-[100%] flex flex-col items-center mb-5">
              {
                productData.length === 0 ? <div>Product Not Available at the moment</div> : <ProductList data={productData}/>
              }
            </div>
          </main>
          <aside className="bg-white-100 sm:fixed sm:top-[75px] w-[250px] sm:right-[-500px] h-[100%] laptop:mr-0 flex laptop:w-[20%] flex-col items-center">
            Cart is empty
          </aside>
        </div>
      </div>
      <footer className="text-white-50 bg-blue-500 flex w-[100vw] justify-center items-center p-5 sm:py-3 mb-0">
        All Rights Reserved
      </footer>
    </div>
  )
}

export default App;
