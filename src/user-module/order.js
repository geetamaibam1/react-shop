import {useState,useEffect} from 'react';
const MyOrder = ()=>{
    const[orderlist,setOrderlist] = useState([]);
    const getOrderlist = async ()=>{
        let userid = localStorage.getItem("token");
        try{
            await fetch("http://localhost:1235/orderapi?userid="+userid)            
            .then(response=>response.json())
            .then(orderinfo=>{
                setOrderlist(orderinfo.reverse());
            })
        }catch(err){
            console.log("Error:"+err);
        }
    }
    useEffect(()=>{
        getOrderlist();
    },[])
    return(
        <div className="container">
            <h2 className="text-center text-primary mt-4 mb-4">My Orders :{orderlist.length}</h2>
            {
                orderlist.map((order,index)=>{
                    return(
                        <div className="row p-4 m-2 shadow-lg">
                            <div className="col-md-3">
                                <h6>Full Name:{order.customer}</h6>
                                <p>Mobile:{order.mobile}</p>
                                <p>Address:{order.address}</p>
                            </div>
                            <div className="col-md-9">
                                <table className="table table-bordered">
                                    <thead>
                                       
                                            <tr>
                                                <th>Item  Name</th>
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
                                                        <td><img src={item.pphoto} height={40} width={40} alt={item.pname}/></td>
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
export default MyOrder;