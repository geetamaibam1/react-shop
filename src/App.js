import PublicHome from "./public-module/publichome";
import UserHome from "./user-module/userhome";
import SellerHome from "./seller-module/sellerhome";
function App() {
  let id = localStorage.getItem("token");
  if(id!=null){
      let role = localStorage.getItem("type");
      switch(role){
          case "USER": return (<UserHome/>);
          case "SELLER": return (<SellerHome/>);  //eg of conditional rendering
          default: return (<UserHome/>);
      }
  }
  else{
    return <PublicHome/>;
  }
}

export default App;
