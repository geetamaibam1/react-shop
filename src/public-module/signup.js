import {useState} from 'react';
const Signup = ()=>{
    let[fullname,setFullname] = useState("");
    let[email,setEmail] = useState("");
    let[password,setPassword] = useState("");
    let[cpassword,setCpassword] = useState("");
    let [signupMsg,setSignupMsg] = useState("");
    const signupUser = async (obj)=>{
        obj.preventDefault();
        if(password=== cpassword){
            let newUserObj = {usertype:"USER",fullname:fullname,email:email,password:password};
            let url = "http://localhost:1235/accounts";
            let postdata = {
                headers:{'content-type':'application/json'},
                method:"post",
                body:JSON.stringify(newUserObj)
            }
            try{
                await fetch(url,postdata)
                .then(response=>response.json())
                .then(accountinfo=>{
                    setSignupMsg("Your Account Successfully Created!");
                    obj.target.reset();
                })
            }catch(err){
                console.log("Error:"+err);
            }            
        }    
        else{            
            setSignupMsg("Password and Confirm Password are not the same!");
        }

    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h2 className="text-center text-primary mb-5 mt-3">Create User Account</h2>
                    <p id="msg" className="text-warning text-center">{signupMsg}</p>
                    <form className="border border-light shadow-lg p-4" onSubmit={signupUser}>
                        <label className="mb-2">Full Name</label>
                        <input type="text" className="form-control mb-2" onChange={(e)=>setFullname(e.target.value)} required/>
                         <label  className="mb-2">Email</label>
                        <input type="email" className="form-control mb-2" onChange={(e)=>setEmail(e.target.value)} required/>
                         <label  className="mb-2">Password</label>
                        <input type="password" className="form-control mb-2" onChange={(e)=>setPassword(e.target.value)} required/>
                         <label  className="mb-2">Confirm Password</label>
                        <input type="password" className="form-control mb-2" onChange={(e)=>setCpassword(e.target.value)} required/>
                        <div className="text-center"><button className="btn btn-success text-white me-2" type="submit">Submit</button>
                             <button className="btn btn-danger text-white me-2" type="reset">Reset</button>
                        </div>                      
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}
export default Signup;