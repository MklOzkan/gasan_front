import "@/components/common/menu/menuDiv.scss"
import LoginForm from "@/components/login/loginForm";
import Spacer from "@/components/common/spacer";
const AdminPage = () => {

  return (
   <>
   <Spacer height={300}/>
   <LoginForm role="admin"/>
  
   </>
  )
}

export default AdminPage