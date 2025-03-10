import AdminNavbar from "../../components/AdminNavbar";
import MessageToast from "../../components/MessageToast";
import { Outlet } from "react-router-dom";
function AdminLayout() {
  return (
    <>
      <MessageToast />
      <AdminNavbar />
      <Outlet />
    </>
  );
}

export default AdminLayout;
