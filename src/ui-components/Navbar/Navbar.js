import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { setValue } from "../../redux/actions";
import { defaultTheme, wonderland } from "../../themes";
import { AuthContext } from "../../authenticator/WithAuthenticator";
import axios from "axios";

function Navbar({ screenWidth }) {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const [click, setClick] = useState(false);
  const [subName, setSubName] = useState("");
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSubName(
          "True experts of digital marketing, where creativity fuels business success."
        );
        break;
      default:
        setSubName(
          "True experts of digital marketing, where creativity fuels business success."
        );
        break;
    }
    document.title = `V-MAX Shop`;
  }, [subName, location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-main-mobile">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img
              className="navbar-logo-img"
              src="/images/VMAX_Logo_Main.png"
              alt="VMAX logo"
            />
            <img
              className="lightning-logo"
              src="/images/Lightning.svg"
              alt="logo lightning"
            />
            <p className="navbar-title">Shop</p>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <img src="/images/bars-solid.svg" alt="bars-solid" />
          </div>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <div className="nav-links">
              <img src="/images/plus_img.svg" />
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-links">
              <img src="/images/person_img.svg" />
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-links">
              <img src="/images/setting_img.svg" />
            </div>
          </li>
          <li className="nav-item">
            <div
              className="nav-links"
              id="navbar-connect-button"
              onClick={logout}
            >
              Sign Out
            </div>
          </li>
        </ul>

        {/* {screenWidth <= 960 && (
          <div className={click ? "nav-menu-mobile active" : "nav-menu-mobile"}>
            <div className="items-container-mobile">
              <div className="nav-items-mobile">
                <ul className="nav-item-ul">
                  <li className="nav-item-mobile">
                    <Link
                      to="/brands"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      For Brand
                    </Link>
                  </li>
                  <li className="nav-item-mobile">
                    <Link
                      to="/about-us"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="nav-items-mobile">
                <ul className="nav-item-ul">
                  <li className="nav-item-mobile">
                    <Link
                      to="/creators"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      For Creator
                    </Link>
                  </li>
                  <li className="nav-item-mobile">
                    <Link
                      to="/contact-us"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="nav-items-mobile">
                <ul className="nav-item-ul">
                  <li className="nav-item-mobile">
                    <Link
                      to="/service"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      Other Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <Link
              to="/lets-connect"
              id="navbar-connect-button-mobile"
              onClick={closeMobileMenu}
            >
              Let's Connect
            </Link>
          </div>
        )} */}
      </div>
    </nav>
  );
}

export default Navbar;
