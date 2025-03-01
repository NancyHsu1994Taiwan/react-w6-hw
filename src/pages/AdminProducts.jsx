import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const { VITE_BASE_URL: BASE_URL, VITE_API_BASE: API_BASE } = import.meta.env;
  const navigate = useNavigate();
  const checkAuth = async () => {
    try {
      await axios.post(`${BASE_URL}/api/user/check`);
    } catch (error) {
      alert("請重新登入", error.message);

      navigate("/");
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      <h1>AdminProducts</h1>
    </>
  );
}

export default AdminProducts;
