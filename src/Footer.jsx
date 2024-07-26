import t24logo from "./assets/T24logo.png";
import React from "react";
import whatsapp_logo from "./assets/whatsapp_logo.png";
import telegram_logo from "./assets/telegram_logo.png";
import join_channel from "./assets/join_our_channel.png";
import "./footer.css";


function Footer() {
  return (
    <div className="footer">
      <div className="footer-left">
        <div className="footer-left-logo">
          <img src={t24logo} alt="" />
        </div>
        <div className="footer-left-text">
          <p>
            WE WILL TRADE FOR YOU. <br></br>
            AN EXPERT MASTER WORK FOR YOU 24 HOURS. <br></br>
            FIVE DAYS IN A WEEK <br></br>
          </p>
        </div>
        <div className="footer-left-links">
          <div className="footer-left-links_email">
            <h5 className="footer-links-header">EMAIL</h5>
            <p>trilliontwentyfour@gmail.com</p>
          </div>
          <div className="footer-left-links_uselink">
            <h5 className="footer-links-header">USEFUL LINKS</h5>
            <a href="https://calender.trilliontwentyfour.com/">
            <p>P&L Calender</p>
            </a>
            <a href="https://trilliontwentyfour.com/index.php/t24-master-clan/">
            <p>T24 Master Clan</p>
            </a>
            <a href="https://trilliontwentyfour.com/index.php/t24-plans/">
            <p>T24 Plans</p>
            </a>
            <a href="https://trilliontwentyfour.com/index.php/connect-our-clan/">
            <p>Connect Our Clan</p>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-social">
        <a href="">
        <img className="footer-social-join" src={join_channel} alt="" />
        </a>
        <a href="https://t.me/trilliontwentyfour">
        <img className="footer-social-telegram" src={telegram_logo} alt="" />
        </a>
        <a href="https://chat.whatsapp.com/HSozOdbYEi97XWcwmuZUEL">
        <img className="footer-social-whatsapp" src={whatsapp_logo} alt="" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
