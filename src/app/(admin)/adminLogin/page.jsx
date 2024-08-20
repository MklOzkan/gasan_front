import "@/components/common/menu/menuDiv.scss"
import LoginForm from "@/components/login/loginForm";
import Spacer from "@/components/common/spacer";
import PageHeader from "@/components/common/page-header";
const AdminPage = () => {

  return (
   <>
   <PageHeader>YÖNETİCİ GİRİŞ SAYFASI</PageHeader>
   <Spacer height={250}/>
   <LoginForm/>
  
   </>
  )
}

export default AdminPage