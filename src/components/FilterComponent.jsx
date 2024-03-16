import { React, useState } from 'react';

function FilterComponent({ productData, size, onSizeFilterChange, category, onCategoryFilterChange, color, onColorFilterChange, productSort, sort, onSortFilterChange }){
  const [sizeOpen,setSizeOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  
  const handleSortDropdown = () => {
    setSizeOpen(false);
    setCategoryOpen(false);
    setColorOpen(false);
    setSortOpen(!sortOpen);
  }
  
  const handleSizeDropdown = () => {
    setSizeOpen(!sizeOpen);
    setCategoryOpen(false);
    setColorOpen(false);
    setSortOpen(false);
  }
  const handleCategoryDropdown = () => {
    setCategoryOpen(!categoryOpen);
    setSizeOpen(false);
    setColorOpen(false);
    setSortOpen(false);
  }
  const handleColorDropdown = () => {
    setColorOpen(!colorOpen);
    setSizeOpen(false);
    setCategoryOpen(false);
    setSortOpen(false);
  }
  // SizeFilter Handler
  
  const handleSizeFilter = (selectedSize) => {
    setSizeOpen(false);
      const filteredProducts = productData.filter(x => x.availableSizes.includes(selectedSize));
      onSizeFilterChange(filteredProducts, selectedSize);
  }
  
  // category Filter Handler
  
  const handleCategoryFilter = (selectedCategory) => {
    setCategoryOpen(false);
    const filteredCategoryProducts = productData.filter(x => x.category === selectedCategory);
    onCategoryFilterChange(filteredCategoryProducts, selectedCategory);
  }
  
  //Color Filter Handler
  
  const handlecColorFilter = (selectedColor) => {
    setColorOpen(false);
    const filteredColorProducts = productData.filter(x => x.color.includes(selectedColor));
    onColorFilterChange(filteredColorProducts, selectedColor);
  }
  
  
  const handleSortFilter = (selectedSort) => {
    setSortOpen(false);
    const sortedProducts = [...productSort].slice().sort((a, b) => (
      selectedSort === "Highest" ? ((a.price < b.price) ? 1 : -1) :
      selectedSort === "Lowest" ? ((a.price > b.price) ? 1 : -1) :
      selectedSort === "Latest" ? ((a._id < b._id) ? 1 : -1) : 
      ((a._id > b._id) ? 1 : -1)
    ));
    onSortFilterChange(sortedProducts, selectedSort);
  }
  
  
  return (
    <div className="w-[100%] h-[100%] flex items-center overflow-auto">
      <div className="flex gap-5 items-center h-[100%] text-xl text-blue-500 font-medium relative">
        <div className="flex gap-2 items-center text-xl text-blue-500 font-medium relative w-[max-content]"> 
          <button className="text-blue-500 text-xl" onClick={()=>handleSortDropdown()}>Sort: {sort}</button>
          {sortOpen ? (
            <ul className="absolute top-[100%] left-0 bg-white-50 shadow-md border-[1px] border-white-100 z-900 px-3 py-3">
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s] border-b-[1px] border-white-150">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handleSortFilter("Oldest")}>Oldest</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s] border-b-[1px] border-white-150">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handleSortFilter("Latest")}>Latest</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s] border-b-[1px] border-white-150">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handleSortFilter("Highest")}>Highest</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s] border-b-[1px] border-white-150">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handleSortFilter("Lowest")}>Lowest</button>
              </li>
            </ul>
          ) : null}
        </div>
        <div className="flex gap-2 items-center text-xl text-blue-500 font-medium relative w-[max-content]"> 
          <button className="text-blue-500 text-xl" onClick={()=>handleCategoryDropdown()}>Categories: {category}</button>
          {categoryOpen ? (
            <ul className="absolute top-[100%] left-0 bg-white-50 shadow-md border-[1px] border-white-100 z-900 px-3 py-3">
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s] border-b-[1px] border-white-150">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handleCategoryFilter("All")}>All</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s] border-b-[1px] border-white-150">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handleCategoryFilter("Gowns")}>Gowns</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s] border-b-[1px] border-white-150">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handleCategoryFilter("Shoes")}>Shoes</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s]">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handleCategoryFilter("Hoodies")}>Hoodies</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s] border-b-[1px] border-white-150">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handleCategoryFilter("Bags")}>Bags</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s] border-b-[1px] border-white-150">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handleCategoryFilter("T-shirts")}>T-shirts</button>
              </li>
            </ul>
          ) : null}
        </div>
        <div className="flex gap-2 items-center text-xl text-blue-500 font-medium relative w-[max-content]"> 
          <button className="text-blue-500 text-xl" onClick={()=>handleSizeDropdown()}>Sizes: {size}</button>
          {sizeOpen ? (
            <ul className="absolute top-[100%] left-0 bg-white-50 shadow-md border-[1px] border-white-100 z-900 p-3">
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s]">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handleSizeFilter("All")}>All</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s]">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handleSizeFilter("S")}>S</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s]">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handleSizeFilter("M")}>M</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s]">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handleSizeFilter("L")}>L</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s]">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handleSizeFilter("XL")}>XL</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s]">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handleSizeFilter("XXL")}>XXL</button>
              </li>
            </ul>
          ) : null}
        </div>
        <div className="flex gap-2 items-center text-xl text-blue-500 font-medium relative w-[max-content]"> 
          <button className="text-blue-500 text-xl" onClick={()=>handleColorDropdown()}>Color: {color}</button>
          {colorOpen ? (
            <ul className="absolute top-[100%] right-0 bg-white-50 shadow-md border-[1px] border-white-100 z-900 p-3">
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s]">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handlecColorFilter("All")}>All</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s]">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handlecColorFilter("Black")}>Black</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s]">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handlecColorFilter("Brown")}>Brown</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s]">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handlecColorFilter("White")}>White</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s]">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handlecColorFilter("Red")}>Red</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s]">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handlecColorFilter("Blue")}>Blue</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s]">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handlecColorFilter("Grey")}>Grey</button>
              </li>
              <li className="list-none px-[15px] py-[5px] hover:bg-[#d6d3d3] rounded-[8px] duration-[.7s]">
                <button className="text-blue-500 text-xl w-[100%] text-left" onClick={()=>handlecColorFilter("Yellow")}>Yellow</button>
              </li>
            </ul>
          ) : null}
        </div>
        
      </div>
    </div>
  )
}

export default FilterComponent;