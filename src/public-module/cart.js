import {useState,useEffect}  from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const MyCart = ()=>{
    let[cartitemlist,setCartitemlist] = useState([]);
    const getCartItems = async ()=>{
        try{
            await fetch("http://localhost:1235/cartapi")
            .then(response=>response.json())
            .then(itemArr=>{
                setCartitemlist(itemArr);
            })
        }catch(err){
            console.log("Error:"+err);
        }
    }
    useEffect(()=>{
        getCartItems();
    },[])
    let total = 0;
    const updateQty = (item,action)=>{
        if(action==='A'){
            item["qty"] = item.qty +1;
        }
        else{
            item["qty"] = item.qty -1;
        }
        if(item.qty === 0){
            deleteItem(item.id);
        }
        let url = "http://localhost:1235/cartapi/"+item.id;
        let postdata = {
            headers:{'content-type':'application/json'},
            method:"PATCH",
            body:JSON.stringify(item)
        }
        try{
            fetch(url,postdata)
            .then(response=>response.json())
            .then(iteminfo=>{
                console.log("Quantity of "+item.pname+" updated!");
                getCartItems();
            })
        }catch(err){
            console.log("Error:"+err);
        }
    }
    let showBlock = "";
    if(localStorage.getItem("token")=== null){
        showBlock = "d-none";
    }
    else{
        showBlock = "d-block";
    }
    let[fullname,setFullname] = useState(localStorage.getItem("fullname"));
    let[mobile,setMobile] = useState("");
    let[address,setAddress] = useState("");
     const deleteItem = (id) => {
        let url = "http://localhost:1235/cartapi/" + id;
        let postData = { method: "delete" };
        fetch(url, postData)
            .then(response => response.json())
            .then(info => {               
                getCartItems();
            })
    }
    let navigate = useNavigate();
    const loginCheck2 = async ()=>{         
        if(localStorage.getItem("token") === null){
            navigate("/login");
        }
        else{
            if(cartitemlist.length>0 && fullname.trim()!="" && mobile.trim()!="" && address.trim()!=""){
                let orderobj  = {                                   
                                    customer:fullname,
                                    mobile:mobile,
                                    address:address,
                                     userid:localStorage.getItem("token"),
                                    orderitems:cartitemlist
                                };
                let url = "http://localhost:1235/orderapi";
                let postdata = {
                    headers:{'content-type':'application/json'},
                    method:"post",
                    body:JSON.stringify(orderobj)
                }
                try{
                    await fetch(url,postdata)
                    .then(response=>response.json())
                    .then(orderinfo=>{
                        Swal.fire("Your Order Placed Successfully!");  
                        setFullname("");
                        setMobile("");
                        setAddress("");                  
                    })
                }catch(err){
                    console.log("Error:"+err);
                }
                cartitemlist.map((item,index)=>{
                    deleteItem(item.id);
                })
                }
        }
    }
    return(
        <div className="container">
            <h2 className="text-center text-primary mt-4 mb-4">{cartitemlist.length} Items In Cart</h2>
            <div className="row mt-3 mb-3">
                <div className="col-md-12">
                    <table className="table table-bordered p-3">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Photo</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               cartitemlist.map((item,index)=>{
                                    total = total +(item.pprice * item.qty);
                                    return(                                      
                                        <tr key={index}>
                                            <td>{item.pname}</td>
                                            <td><img src ={item.pphoto} height={40} width={40} alt={item.pname}/></td>
                                            <td>{item.pprice}</td>
                                            <td className="input-group">                                               
                                                    <button className="btn btn-warning btn-sm" onClick={()=>updateQty(item,'B')}>-</button>
                                                    <span className="mx-2">{item.qty}</span>
                                                    <button  className="btn btn-primary btn-sm"  onClick={()=>updateQty(item,'A')}>+</button>                                                
                                            </td>
                                            <td>{item.pprice * item.qty}</td>
                                            <td><button className="btn btn-danger delBtn" onClick={()=>deleteItem(item.id)}><i className="fa fa-trash"></i></button></td>
                                        </tr>
                                    )
                               })
                            }
                        </tbody>
                    </table>                    
                </div>
                <p className="text-center mt-2 mb-4"><b>Total: {total}</b></p>
            </div>
            <div className={showBlock}>                
                <div className="row mb-3 bg-light p-4">
                    <h2 className="text-center text-primary mt-3 mb-3">Enter Delivery Details</h2>
                    <div className="col-md-4">
                        <label>Full Name</label>
                        <input type="text" className="form-control" value={fullname} onChange={(e)=>setFullname(e.target.value)} required/>
                    </div>
                    <div className="col-md-4">
                         <label>Mobile</label>
                        <input type="number" className="form-control" value={mobile} onChange={(e)=>setMobile(e.target.value)} required/>
                    </div>
                    <div className="col-md-4">
                        <label>Delivery Address</label>
                        <textarea className="form-control" value={address} onChange={(e)=>setAddress(e.target.value)} required></textarea>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4 mb-4"><button className="btn btn-primary" onClick={loginCheck2}>Place Order</button></div>
        </div>
    )
}
export default MyCart;