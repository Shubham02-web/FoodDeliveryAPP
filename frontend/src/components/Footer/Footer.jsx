import { assets } from "../../assets/assets";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="Footer" id="Footer">
      <div className="Footer-content">
        <div className="Footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima
            impedit ut temporibus, nesciunt necessitatibus incidunt quos iste
            inventore eveniet quidem.
          </p>
          <div className="Footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook icon" />
            <img src={assets.twitter_icon} alt="twweter icon" />
            <img src={assets.linkedin_icon} alt="linkdin icon" />
          </div>
        </div>
        <div className="Footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery </li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="Footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-9090909090</li>
            <li>ContactUs@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="Footer-copyright">
        Copyright 2025 @OrderMeTomato.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
