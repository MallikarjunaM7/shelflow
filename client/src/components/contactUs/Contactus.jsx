import React from 'react';
import './Contactus.css';
import Navbar from '../essentials/Navbar';
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
import '/public/HomePage.css'
const Contactus = () => {
  return (
    <>
    <Navbar />
    <div className="contact-us-container">
      <div className="contact-info">
        <h2>Contact Us</h2>
        <div className="info-item">
          <i className="fas fa-map-marker-alt"></i>
          <p>295 Witting Streets Suite 666, Melbourne, Australia</p>
        </div>
        <div className="info-item">
          <i className="fas fa-phone-alt"></i>
          <p>(01) 7349516919<br/>(01) 479-642-7462</p>
        </div>
        <div className="info-item">
          <i className="fas fa-envelope"></i>
          <p>anderson@hotmail.com<br/>hello@hotmail.com</p>
        </div>
      </div>

      <div className="contact-form">
        <h2>Or Write Us</h2>
        <form>
          <input type="text" placeholder="Name *" required />
          <input type="email" placeholder="Email *" required />
          <textarea placeholder="Enter Your Message" required></textarea>
          <button type="submit">SEND MESSAGE</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Contactus;