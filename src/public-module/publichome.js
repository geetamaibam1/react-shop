import {HashRouter,Routes,Route,Link} from 'react-router-dom';
import MyLogin from "./login";
import Signup from "./signup";
import MyHome from "./home";
import MyCart from "./cart";
const PublicHome = ()=>{  
    return(
        <HashRouter>
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
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
                            <Link className="nav-link active" to="/login"><i className="fa fa-lock"></i> Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/signup"><i className="fa-solid fa-user-plus"></i> Create Account</Link>
                        </li>                       
                    </ul>                 
                    </div>
                </div>
                </nav>
                <Routes>
                    <Route exact path="/" element={<MyHome/>}/>
                    <Route exact path="/mycart" element={<MyCart/>}/>
                    <Route exact path="/login" element={<MyLogin/>}/>
                    <Route exact path="/signup" element={<Signup/>}/>
                    
                </Routes>
        </HashRouter>  
    )
    
}
export default PublicHome;