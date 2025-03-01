import { NavLink } from "react-router-dom";
function AdminNavbar() {
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
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;
