import {React, useState, useEffect} from 'react';
import ProductList from './components/ProductList.jsx';
import products from './products.js';

function App() {
  const [productData, setProductData] = useState(products);
  //const [size, setSize] = useState("");
  //const [sort,setSort] = useState("");
 
  return (
    <div className="w-[100vw] min-h-[99vh] flex flex-wrap">
      <header className="text-white-50 bg-blue-500 flex w-[100vw] justify-center items-center p-5">
        <div className="w-[100%] laptop:max-w-[980px] desktop:max-w-[1150px] flex items-center h-[100%]">
          <a href="/">Premium Wears</a>
        </div>
      </header>
      <div className="w-[100%] h-[100vh] overflow-scroll flex flex-col items-center bg-white-50 p-5">
        <div className="laptop:max-w-[980px] desktop:max-w-[1150px] w-[100%] flex flex-wrap h-[100vh]">
          <nav className="bg-white-100 h-100 laptop:ml-0 w-[100%] flex flex-col items-center mb-5">
            Filters
          </nav>
          <main className="h-100 flex w-100 laptop:w-[80%] flex-col items-center">
            <h1 className="mb-5 text-left">Products</h1>
            <div className="w-[100%] flex flex-col items-center mb-5">
              <ProductList data={productData}/>
            </div>
          </main>
          <aside className="bg-white-100 sm:fixed sm:top-[75px] w-[250px] sm:right-[0px] h-[100%] laptop:mr-0 flex laptop:w-[20%] flex-col items-center">
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
