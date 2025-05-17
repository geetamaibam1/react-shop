import {useState,useRef} from 'react';
const MyLogin = ()=>{
    let[displayMsg,setDisplayMsg] = useState("Enter Your Credentials");
    let emailRef = useRef();
    let passwordRef = useRef();
    
    const loginCheck = async(obj)=>{
        obj.preventDefault();
        let emailid = emailRef.current.value;
        let passwd = passwordRef.current.value;
        console.log("emailid="+emailid+",password:"+passwd);
        try{
           await fetch("http://localhost:1235/accounts")
            .then(response=>response.json())
            .then(accountArr=>{
            let myaccount = accountArr.filter((account,index)=>{
                if(account.email===emailid && account.password=== passwd){
                    return account;
                }
            })
            if(myaccount.length>0){
                setDisplayMsg("Please Wait...Logging You In!")
                let email = myaccount[0].email;
                let password = myaccount[0].password;
                let id = myaccount[0].id;
                let type = myaccount[0].usertype;
                let fullname = myaccount[0].fullname;              
                localStorage.setItem("token",id);
                localStorage.setItem("email",email);
                localStorage.setItem("password",password);
                localStorage.setItem("type",type);
                localStorage.setItem("fullname",fullname);
                window.location.reload();
            }
            else{
                setDisplayMsg("Incorrect Credentials...");                
            }
        })

        }catch(err){
            console.log("Error:"+err);
        }
    }
    return(
        <div className="container">
            <div className="row mt-5 mb-5">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <p className="text-primary text-center">{displayMsg}</p>
                    <form onSubmit={loginCheck}>
                    <div className="card shadow-lg">
                        <div className="card-header bg-danger text-white"><i className="fa-solid fa-lock"></i> Login</div>
                        <div className="card-body mb-3">                         
                            <label className="mb-3">Email ID</label>
                            <input type="email" className="form-control mb-3" ref={emailRef}/>
                            <label className="mb-3">Password</label>
                            <input type="password" className="form-control mb-3" ref={passwordRef}/>                                                
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-primary text-white">Login <i className="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    )
}
export default MyLogin;