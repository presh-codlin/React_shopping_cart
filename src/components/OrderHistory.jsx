import React from 'react';
//import Zoom from 'react-reveal/Zoom';

function OrderHistory({orderHistoryData, handleClearHistory, handleRemoveHistory}){
  return (
    <div className="w-[100vw] laptop:max-w-[980px] desktop:max-w-[1150px] h-[90vh] bg-white-100 flex flex-col items-center py-10 px-3">
      <div className="w-[100%] flex justify-between items-center">
        <h2 className="text-xl text-center text-blue-500 font-bold">Order History</h2>
        <button onClick={() => handleClearHistory()} className="text-sm laptop:text-sm text-white-50 rounded-[5px] px-5 py-2 laptop:px-4 laptop:py-2 bg-orange-300 hover:text-orange-300 hover:bg-white-50 hover:border-[1.5px] hover:border-orange-300">Clear All History</button>
      </div>
      <div className="w-[100%]">
        {
          orderHistoryData.map((order, index) => {
            return(
              <div key={index}>
                <div className="w-[100%] flex flex-col">
                  <div className="w-[100%] flex justify-between items-center px-2 py-4">
                    <h1>{order.id}</h1>
                    <i onClick={()=>handleRemoveHistory()} className="fa fa-trash border-orange-300 border-[1px] p-4"></i>
                  </div>
                  <div>
                    <li>{order.name}</li>
                    <li>{order.email}</li>
                    <li>{order.address}</li>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default OrderHistory;