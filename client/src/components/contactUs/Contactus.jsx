import React from 'react';
import Navbar from '../essentials/Navbar';

const Contactus = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 bg-[#a8e1e8] font-[Poppins] min-h-[90vh] px-4 py-8">
        {/* Contact Info Box */}
        <div className="bg-[#122647] text-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-sm relative md:top-5 md:-mr-10 z-20">
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
          <div className="flex items-center mb-4">
            <i className="fas fa-map-marker-alt text-lg mr-3"></i>
            <p>295 Witting Streets Suite 666, Melbourne, Australia</p>
          </div>
          <div className="flex items-center mb-4">
            <i className="fas fa-phone-alt text-lg mr-3"></i>
            <p>(01) 7349516919<br/>(01) 479-642-7462</p>
          </div>
          <div className="flex items-center mb-4">
            <i className="fas fa-envelope text-lg mr-3"></i>
            <p>anderson@hotmail.com<br/>hello@hotmail.com</p>
          </div>
        </div>

        {/* Contact Form Box */}
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md z-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Or Write Us</h2>
          <form className="flex flex-col">
            <input
              type="text"
              placeholder="Name *"
              required
              className="border border-gray-300 rounded px-4 py-3 mb-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="email"
              placeholder="Email *"
              required
              className="border border-gray-300 rounded px-4 py-3 mb-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <textarea
              placeholder="Enter Your Message"
              required
              className="border border-gray-300 rounded px-4 py-3 mb-4 text-base resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-300"
            ></textarea>
            <button
              type="submit"
              className="bg-[#122647] text-white py-3 rounded hover:bg-[#0a1a33] transition"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contactus;
