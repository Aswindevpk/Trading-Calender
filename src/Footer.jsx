import React from "react";
import whatsapp_logo from "./assets/whatsapp_logo.png";
import telegram_logo from "./assets/telegram_logo.png";
import "./footer.css";


function Footer() {
  return (
    <div className="footer">
      <div className="footer-left">
        {/* <div className="footer-left-logo">
          <img src="" alt="" />
        </div> */}
        {/* <div className="footer-left-text">
          <p>
            WE WILL TRADE FOR YOU. <br></br>
            AN EXPERT MASTER WORK FOR YOU 24 HOURS. <br></br>
            FIVE DAYS IN A WEEK <br></br>
          </p>
        </div> */}
        <div className="footer-left-links">
          <div className="footer-left-links_email">
            <h5 className="footer-links-header">EMAIL</h5>
            <p>tradingcal@gmail.com</p>
          </div>
          <div className="footer-left-links_uselink">
            <h5 className="footer-links-header">USEFUL LINKS</h5>
            <a href="#">
            <p>Home</p>
            </a>
            <a href="#">
            <p>About Us</p>
            </a>
            <a href="#">
            <p>Careers</p>
            </a>
            <a href="#">
            <p>Connect Us</p>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-social">
        {/* <a href="">
        <img className="footer-social-join" src={join_channel} alt="" />
        </a> */}
        <a href="#">
        <img className="footer-social-telegram" src={telegram_logo} alt="" />
        </a>
        <a href="#">
        <img className="footer-social-whatsapp" src={whatsapp_logo} alt="" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
