import {useState,useEffect} from 'react';
const MyProfile = ()=>{
    let id = localStorage.getItem("token");
    let[profile,setProfile] = useState({});
    const getProfile = async (id)=>{
        try{           
            await fetch("http://localhost:1235/accounts/"+id)
            .then(response=>response.json())
            .then(account=>{
                setProfile(account);
            })
        } catch(err){
            console.log("Error:"+err);
        }
    }
    useEffect(()=>{
        getProfile(id);
    },[])
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4  text-center shadow-lg mt-5 -4">
                    <h2 className="text-primary mb-3">My Profile</h2>
                    <p><b>Full Name:</b>{profile.fullname}</p>
                    <p>Email ID:{profile.email}</p>
                    <p>Password:{profile.password}</p>
                    <p>User Type:{profile.usertype}</p>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    )
}
export default MyProfile;