import React, { useState } from "react";

import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
           <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li> 
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>

            <a
              href="http://localhost:5173/products"
              style={{ textDecoration: "none" }}
              onClick={() => handleMenuClick(5)}
            >
              <p className={menuClass}>
                Apps
              </p>
            </a>
          </li>
          <li>
            <a
              href="http://localhost:5173"
              style={{ textDecoration: "none" }}
              onClick={() => handleMenuClick(5)}
            >
              <p className={menuClass}>
                HomePage
              </p>
            </a>
          </li>
        </ul>
        <hr />
        <div className="profile">
          {/* <div className="avatar">ZU</div> */}
          <p className="username">USER INFO</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
