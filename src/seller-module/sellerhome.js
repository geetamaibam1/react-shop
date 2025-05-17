import {HashRouter,Routes,Route,Link} from 'react-router-dom';
import useLogout from "../userLogout";
import ProductList from "./productlist";
import NewProduct from "./newproduct";
import Orderlist from './orderlist';
import Dashboard from './dashboard';
const SellerHome=()=>{
    return(
        <HashRouter>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand"><i className="fa-solid fa-bag-shopping"></i> React Shopping</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                             <Link className="nav-link active" to="/"><i className="fa-solid fa-house"></i> Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to ="/productlist"><i className='fa fa-database'></i> Product List</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/newproduct"><i className='fa fa-plus'></i> New Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/orderlist"><i className='fa fa-suitcase'></i>    Order List</Link>
                        </li>
                        <li className="nav-item welcome">
                            <Link className="nav-link fst-italic active">Welcome, <span className="text-warning">{localStorage.getItem("fullname")}</span></Link>
                        </li>
                       <li className="nav-item active">
                            <button className="nav-link active" onClick={useLogout}><i className='fa fa-power-off text-danger'></i> Logout</button>
                        </li>
                    </ul>                 
                    </div>
                </div>
                </nav>
                <Routes>
                    <Route exact path="/" element={<Dashboard/>}/>
                    <Route exact path="/newproduct" element={<NewProduct/>}/>
                    <Route exact path="/productlist" element={<ProductList/>}/>
                    <Route exact path="/orderlist" element={<Orderlist/>}/>
                    
                </Routes>
        </HashRouter>
   
    )
}
export default SellerHome;