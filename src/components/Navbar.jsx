import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item me-3">
                <NavLink
                  to="/"
                  className={({ isActive }) => {
                    return `nav-link ${
                      isActive ? "text-decoration-underline" : ""
                    }`;
                  }}
                >
                  首頁
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink
                  to="/products"
                  className={({ isActive }) => {
                    return `nav-link ${
                      isActive ? "text-decoration-underline" : ""
                    }`;
                  }}
                >
                  產品列表
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink
                  to="/carts"
                  className={({ isActive }) => {
                    return `nav-link ${
                      isActive ? "text-decoration-underline" : ""
                    }`;
                  }}
                >
                  購物車
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className={({ isActive }) => {
                    return `nav-link ${
                      isActive ? "text-decoration-underline" : ""
                    }`;
                  }}
                >
                  登入
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
