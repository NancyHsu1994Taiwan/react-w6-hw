import axios from "axios";
import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";
function AdminNavbar() {
  const { VITE_BASE_URL: BASE_URL } = import.meta.env;
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/logout`);

      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li>
                <NavLink
                  to="."
                  end
                  className={({ isActive }) => {
                    return `nav-link ${
                      isActive ? "text-decoration-underline" : ""
                    }`;
                  }}
                >
                  產品
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="order"
                  className={({ isActive }) => {
                    return `nav-link ${
                      isActive ? "text-decoration-underline" : ""
                    }`;
                  }}
                >
                  訂單
                </NavLink>
              </li>
              <li className="ms-5">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={logout}
                >
                  登出
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;
