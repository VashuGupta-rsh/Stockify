import React from "react";
import { Link } from "react-router-dom";

// import { useContext } from "react";
// import { AuthContext } from "./authContext";

import { useAuth } from "./context/authContext";



function Navbar() {
 
  // const { isLoggedIn } = useContext(AuthContext);
 
  const { isLoggedIn, logout } = useAuth();


  return (
    <nav
      className="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <img src="images/logo.svg" style={{ width: "25%" }} alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex" role="search">
            <ul className="navbar-nav mb-lg-0">
              <li className="nav-item">
              
              {isLoggedIn && <a href="http://localhost:5174/dashboard" style={{ color: 'red', textDecoration: 'none', fontSize: '18px', marginTop: '8px', display: 'inline-block' }}>Dashboard</a>}
              
              </li>
              <li className="nav-item">
                { isLoggedIn  &&
                  <button className="nav-link active btn" onClick={logout}>
                      Logout
                  </button> 
                }
              </li>
              <li className="nav-item">
                { !isLoggedIn  &&
                  <Link className="nav-link active" aria-current="page" to="/login">
                    Login
                  </Link> 
                }
              </li>
              <li className="nav-item">
                { !isLoggedIn && 
                  <Link className="nav-link active" aria-current="page" to="/signup">
                    Signup
                  </Link>  
                }
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/products">
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/pricing">
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/support">
                  Support
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
