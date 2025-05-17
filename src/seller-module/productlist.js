import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import {useState,useEffect} from 'react';
const ProductList = ()=>{
    let[productlist,setProductlist] = useState([]);
    let[keyword,setKeyword] = useState("");
    let[porder,setPorder] = useState("asc");
     const getProducts = async () => {
        try {
            await fetch("http://localhost:1235/productsapi")
                .then(response => response.json())
                .then(itemArray => {
                    
                    if(porder==="asc"){
                        itemArray.sort((a, b)=>{ return a.pprice - b.pprice }); // asc order by price
                        setProductlist(itemArray);
                        setPorder("desc");
                    }else{
                        itemArray.sort((a, b)=>{ return b.pprice - a.pprice }); // asc order by price
                        setProductlist(itemArray);
                        setPorder("asc");
                    }

                })
        }
        catch (error) {
            alert("Error :" + error);
        }
    }
    const deleteProduct = async (product)=>{
        let url = "http://localhost:1235/productsapi/"+product.id;
        let postdata = {
            method:"delete"
        }
        try{
            await fetch(url,postdata)
            .then(response=>response.json())
            .then(productinfo=>{
                Swal.fire(product.pname+" Deleted Successfully!")
                getProducts();
            })
        }catch(err){
            console.log("Error:"+err);
        }

    }
    useEffect(()=>{
        getProducts();        
    },[])

    let PER_PAGE = 5;
    let[currentpage,setCurrentpage] = useState(0);
    const handlePageClick = ({selected:selectedPage})=>{
        setCurrentpage(selectedPage);
    }
    let offset = currentpage * PER_PAGE;
    let page_count = Math.ceil(productlist.length/PER_PAGE);
    return(
        <div className="container">
           <div className="row mt-4 mb-4">
                <div className="col-md-8">
                     <h1 className="text-center text-primary">Our List of Products:{productlist.length}</h1>
                </div>
                <div className="col-md-4">
                    <input type="text" placeholder = "Search..." onChange={(e)=>setKeyword(e.target.value)}
                        className="form-control"/>
                </div>
           </div>
           <table className="table table-bordered border-secondary">
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>Product Name</th>
                                <th className="bg-warning" onClick={getProducts}>Price <i className="fa-solid fa-arrow-up"></i></th>
                                <th>Details</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productlist.slice(offset,offset+PER_PAGE).map((product,index)=>{
                                    if((product.pname.toLowerCase()).match(keyword.toLowerCase())||(product.pprice.match(keyword)))                                    
                                    return(
                                        <tr>
                                            <td>{product.id}</td>
                                            <td>{product.pname}</td>
                                            <td>{product.pprice}</td>
                                            <td>{product.pdescription}</td>
                                            <td><img src={product.pphoto} height={40} width={40} alt={product.pname}/></td>
                                            <td><button className="btn btn-danger" onClick={()=>deleteProduct(product)}><i className="fa fa-trash"></i></button></td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                pageCount={page_count}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination  justify-content-center"}
                                pageClassName={"page-item "}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active primary"}
                            />
                        </div>
                        <div className="col-md-4"></div>
                    </div>
        </div>
    )
}
export default ProductList;