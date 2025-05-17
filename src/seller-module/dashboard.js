import {Link} from 'react-router-dom';
import {useState,useEffect} from 'react';
const Dashboard=()=>{
    let[productlist,setProductlist] = useState([]);
    const getProducts = async () => {
        try {
            await fetch("http://localhost:1235/productsapi")
                .then(response => response.json())
                .then(itemArray => {                   
                    setProductlist(itemArray);
                })
        }
        catch (error) {
            alert("Error :" + error);
        }
    }
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
    useEffect(()=>{
        getProducts();
        getOrders();
    },[]);
    return(
        <div className="container">
            <h1 className="text-primary text-center mt-4 mb-4">My Dashboard</h1>
            <div className="row mt-5">               
                <div className="col-md-4 text-center">
                    <Link to="/productlist" className="text-decoration-none">
                        <i className='fa fa-suitcase fa-4x'></i><br/>
                        <h3 className="text-primary mt-3">Total Products :{productlist.length}</h3>
                    </Link>
                </div>
                <div className="col-md-4 text-center">
                    <Link to="/orderlist" className="text-decoration-none">
                        <i className='fa fa-headset fa-4x text-warning'></i><br/>
                        <h3 className="text-primary mt-3">Total Orders:{orderList.length}</h3>
                    </Link>
                </div>
                <div className="col-md-4 text-center">
                    <Link to="/newproduct" className="text-decoration-none">
                        <i className='fa fa-plus text-success fa-4x'></i><br/>
                        <h3 className="text-primary mt-3">New Product</h3>
                    </Link>
                </div>               
            </div>
        </div>
    )
}
export default Dashboard;