import { HashRouter,Routes,Route,Link} from "react-router-dom";
import MyHome from '../public-module/home.js';
import MyCart from "../public-module/cart";
import MyProfile from "./profile.js";
import MyOrder from "./order.js";
import useLogout from "../userLogout.js";
const UserHome = ()=>{
    return(
        <HashRouter>
            <nav className="navbar navbar-expand-sm navbar-dark bg-success">
                <div className="container">
                    <Link className="navbar-brand"><i className="fa-solid fa-bag-shopping"></i> React Shopping</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                             <Link className="nav-link active" to="/"><i className="fa-solid fa-house"></i> Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to ="/mycart"><i className="fa fa-shopping-cart"></i> My Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/profile"><i className="fa-solid fa-user"></i> My Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/orderlist"><i className='fa fa-headset'></i>My Orders</Link>
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
                    <Route exact path="/" element={<MyHome/>}/>
                    <Route exact path="/mycart" element={<MyCart/>}/>
                    <Route exact path="/profile" element={<MyProfile/>}/>
                    <Route exact path="/orderlist" element={<MyOrder/>}/>
                    
                </Routes>
        </HashRouter>
    )
}
export default UserHome;