import { useState,useEffect } from "react";
const Orderlist =()=>{
    let[orderList,setOrderlist] = useState([]);
    const getOrders = async () => {
        try {
            await fetch("http://localhost:1235/orderapi")  
                .then(response => response.json())
                .then(orderArr => {          
                    setOrderlist(orderArr.reverse());
                })
        }
        catch (error) {
            alert("Error :" + error);
        }
    }
    useEffect(() => {
        getOrders();
    }, []);
     return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Orders Received:{orderList.length}</h1>
            {
                orderList.map((order,index)=>{
                    return(
                        <div className="row mb-4 bg-light p-4 rounded shadow-lg" key={index}>
                            <div className="col-md-3">
                                <h5>Full Name:{order.customer}</h5>
                                <p>Mobile:{order.mobile}</p>
                                <p>Address:{order.address}</p>
                            </div>
                            <div className="col-md-9">
                        <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Photo</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.orderitems.map((item,index2)=>{                                    
                                    return(
                                        <tr key={index2}>
                                            <td>{item.pname}</td>
                                            <td><img src={item.pphoto} height={40} width={60} alt={item.Name}/></td>
                                            <td>{item.pprice}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.qty * item.pprice}</td>                                            
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>    
                            </div>                            
                        </div>
                    )
                })
            }
        </div>
     
     )
}
export default Orderlist;