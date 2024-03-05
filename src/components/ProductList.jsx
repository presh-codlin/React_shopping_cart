import {React} from 'react';

function ProductList({ data }){
  return(
    <div className="w-[100%] grid grid-cols-[100%] laptop:grid-cols-[minmax(300px,_48%)_minmax(300px,_48%)] desktop:grid-cols-[minmax(250px,_31.5%)_minmax(270px,_31.5%)_minmax(270px,_31.5%)] gap-4">
      {data.map((item) => {
        return(
          <li key={item._id} className="list-none">
            <div className="w-[100%] p-5 rounded-[8px] shadow-[0px_0px_10px_rgba(0,0,0,0.2)] bg-white-150 overflow-hidden">
              <a href="/" className="w-[100%]">
                <img src={item.image} alt="product_image" className="w-[100%] mb-5 rounded-[8px]"/>
                <h4 className="text-xl text-blue-500 font-medium mb-2 line-clamp-1 hover:text-orange-300">{item.title}</h4>
                <p className="text-sm text-blue-500 font-normal mb-5 line-clamp-2">{item.description}</p>
                <div className="w-[100%] h-[45px] flex justify-between items-center">
                  <div className="text-[18px] laptop:text-[2rem] text-blue-500 font-medium">$ {item.price}</div>
                  <button className="text-[14px] laptop:text-xl text-white-50 rounded-[5px] px-[25px] py-[10px] bg-orange-300">Add to Cart</button>
                </div>
              </a>
            </div>
          </li>
        )
      })}
    </div>
  )
}

export default ProductList;