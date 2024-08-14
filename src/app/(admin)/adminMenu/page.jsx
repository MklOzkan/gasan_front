import Menu from "@/components/common/menu/menu";
import data from "./adminMenu.json";


const AdminMenu = () => {
  return (
    <div>
     
      <Menu menu="YÖNETİCİ EKRANI" jsonData={data} />
    </div>
  );
};

export default AdminMenu;
