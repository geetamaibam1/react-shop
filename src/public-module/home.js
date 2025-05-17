import {useState,useEffect} from 'react';
import ReactPaginate from 'react-paginate';
const MyHome = ()=>{
    let[productlist,setProductlist] = useState([]);
    let[keyword,setKeyword] = useState("");
    const getProductlist = async ()=>{
        try{
            await fetch("http://localhost:1235/productsapi")
            .then(response=>response.json())
            .then(productArr=>{
                productArr.sort((a,b)=> a.pname - b.pname);
                setProductlist(productArr);
            })
        } catch(err){
            console.log("Error:"+err);
        }
    }
    useEffect(()=>{
        getProductlist();
    },[])
    const PER_PAGE = 8;
    const[currentPage,setCurrentPage] = useState(0);
    const handlePageClick = ({selected:selectedPage})=>{
        setCurrentPage(selectedPage);
    }
    const offset = currentPage * PER_PAGE;
    const page_count = Math.ceil(productlist.length/PER_PAGE);
    let [cartMsg,setCartMsg] = useState("");
    const addToCart = async (product)=>{
        product["qty"] = 1;
        let url = "http://localhost:1235/cartapi";
        let postdata = {
            headers:{'content-type':'application/json'},
            method:"post",
            body:JSON.stringify(product)
        }
        try{
            await fetch(url,postdata)
            .then(response=>response.json())
            .then(productinfo=>{
                console.log("Added to Cart");
                setCartMsg(productinfo.pname+" Added to Cart!")
            })
        } catch(err){
            console.log("Error:"+err);
        }
        
    }
    return(
        <div className="container">
            <div className="row mt-4 mb-4">
                <div className="col-md-6">
                    <div className="input-group">
                        <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
                        <input type="text" placeholder="Search..." onChange={(e)=>setKeyword(e.target.value)}
                            className="form-control"/>
                    </div>
                </div>                
                <div className="col-md-6">
                     <ReactPaginate
                        previousLabel = {"Previous"}
                        nextLabel = {"Next"}
                        breakLabel = {"..."}
                        pageCount = {page_count}
                        containerClassName = {"pagination justify-content-center"}
                        marginPageDisplayed={2}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName ={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName = {'page-link'}
                        breakClassName={'page-item'}
                        breakLinkClassName ={'page-link'}
                        activeClassName={'active primary'}
                    />       
                </div>
            </div>
            <h6 className="text-center text-success">{cartMsg}</h6>
            <div className="row mb-4">
                {
                    productlist.slice(offset,offset+PER_PAGE).map((product,index)=>{
                        if(product.pname.toLowerCase().match(keyword.toLowerCase()) || product.pprice.match(keyword)){
                            return(
                                <div className="col-md-3">
                                    <div className="p-4 mt-4 mb-4 shadow-lg text-center itemDiv">
                                        <h3>{product.pname}</h3>
                                        <img src={product.pphoto} alt={product.pname} height={200} width="100%"/>
                                        <p>{product.pdescription}</p>
                                        <p><b>Rs.{product.pprice}</b></p>
                                        <p><button className="btn btn-success btn-sm" onClick={()=>addToCart(product)}>
                                            <i className="fa fa-shopping-cart"></i>
                                            Add To cart
                                        </button></p>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}
export default MyHome;