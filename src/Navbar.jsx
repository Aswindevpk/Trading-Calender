import React, { useState } from "react";
import "./Navbar.css";
import toggleBar from "./assets/toggleBar.png";
import toggleBarClose from "./assets/toggleBarClose.png";
import t24logo from "./assets/T24logo.png"
import calendarbutton from "./assets/calendarbutton.png"

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const Menu = () => (
    <>
      <p>
        <a href="https://trilliontwentyfour.com">HOME CLAN</a>
      </p>
      <p>
        <a href="https://trilliontwentyfour.com/index.php/t24-master-clan/">TRILLION MASTER CLAN</a>
      </p>
      <p>
        <a href="https://trilliontwentyfour.com/calender/index.html">
        <img src={calendarbutton} alt="" />
        </a>
      </p>
      <p>
        <a href="https://trilliontwentyfour.com/index.php/connect-our-clan/">CONNECT OUR CLAN</a>
      </p>
      <p>
        <a href="https://trilliontwentyfour.com/index.php/t24-plans/">T24 PLANS</a>
      </p>
    </>
  );
  return (
    <div>
      <div className="navbar">
        <div className="navbar-links">
          <div className="navbar-links_logo">
            <a href="https://trilliontwentyfour.com/">
            <img src={t24logo} alt="" />
            </a>
          </div>
          <div className="navbar-links_container">
            <Menu />
          </div>
        </div>
        <div className="navbar-menu">
          <div className="navbar-menu_toggle">
            {toggleMenu ? (
              <a onClick={() => setToggleMenu(false)}>
                <img src={toggleBarClose} alt="" />
              </a>
            ) : (
              <a onClick={() => setToggleMenu(true)}>
                <img src={toggleBar} alt="" />
              </a>
            )}
          </div>
          {toggleMenu ? (
            <div className="navbar-menu_container">
              <div className="navbar-menu_container-links">
                <Menu />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Navbar;