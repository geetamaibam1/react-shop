import {useState} from 'react';
import Swal from 'sweetalert2';
const NewProduct = ()=>{
    let[newproduct,setNewproduct] = useState({});
    
    const pickvalue=(obj)=>{
        newproduct[obj.target.name] = obj.target.value;
		setNewproduct(newproduct);
    }
    const save = async (obj)=>{
        obj.preventDefault();
        let url = "http://localhost:1235/productsapi";
        let postdata = {
            headers:{'content-type':'application/json'},
            method:"post",
            body:JSON.stringify(newproduct)
        }
        try{
            await fetch(url,postdata)
            .then(response=>response.json())
            .then(productinfo=>{
                Swal.fire(newproduct.pname+" Added Successfully!");
                setNewproduct({});
                obj.target.reset();
            })
        }catch(err){
            console.log("Error:"+err);
        }
    }
    return(
        <div className="container">
            <h1 className="text-primary text-center mt-4 mb-5">Enter Product Details</h1>
            <form onSubmit={save} className="bg-light p-4">
                <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-3">
                    <label className="mb-3">Product Name</label>
                    <input type="text" name="pname" onChange={pickvalue} className="form-control mb-4 border-dark" required/>
                </div>
                <div className="col-md-3">
                    <label  className="mb-3">Product Price</label>
                    <input type="number" name="pprice" onChange={pickvalue} className="form-control mb-4 border-dark" required/>
                </div>
                <div className="col-md-3">
                    <label  className="mb-3">Product Image URL</label>
                    <input type="text" name="pphoto" onChange={pickvalue} className="form-control mb-4 border-dark" required/>
                </div>
                <div className="col-md-2"></div>
            </div>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-9">
                    <textarea name="pdescription" onChange={pickvalue} className="form-control mb-3 border-dark "  required></textarea>
                </div>
                <div className="col-md-2"></div>
            </div>
            <div className="row mt-3 text-center">
                <div className="col-md-4"></div>
                <div className="col-md-3">
                    <button type="submit" className="btn btn-success me-3">Save Product</button> 
                    <button type="reset" className="btn btn-warning">Clear All</button>                 
                </div>               
                <div className="col-md-5"></div>
            </div>
            </form>

        </div>
    )
}
export default NewProduct;