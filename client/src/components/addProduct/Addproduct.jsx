import React, { useEffect, useState } from "react";
import Navbar from "../essentials/Navbar";

function AddProduct() {
  const [imgSource, setImageSource] = useState("");
  const [path, setPath] = useState("");
  const backApi = `http://localhost:5000`;
  const [shopid, setShopid] = useState(localStorage.getItem("shopid"));

  const [formData, setFormData] = useState({
    productName: "",
    supplierName: "",
    supplierEmail: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);

    try {
      const response = await fetch(`${backApi}/api/auth/insertproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, shopid: shopid }),
      });
      const message = await response.json();
      setImageSource(message.imagesource); // Backend returns image filename
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (imgSource) {
      setPath(`/images/${imgSource}`);
    }
  }, [imgSource]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-200 to-blue-300 font-sans p-4">
        <div className="max-w-xl w-full bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-center text-gray-800 text-2xl mb-6 font-semibold">
            Product Information
          </h1>
          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <label className="mb-5 text-left font-semibold text-gray-700">
              Product Name:
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="mt-2 p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                required
              />
            </label>

            <label className="mb-5 text-left font-semibold text-gray-700">
              Supplier Name:
              <input
                type="text"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleChange}
                className="mt-2 p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                required
              />
            </label>

            <label className="mb-5 text-left font-semibold text-gray-700">
              Supplier Email:
              <input
                type="email"
                name="supplierEmail"
                value={formData.supplierEmail}
                onChange={handleChange}
                className="mt-2 p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                required
              />
            </label>

            <label className="mb-5 text-left font-semibold text-gray-700">
              Price:
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-2 p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                required
              />
            </label>

            <button
              type="submit"
              className="mt-6 py-3 bg-blue-700 text-white font-bold rounded-md cursor-pointer hover:bg-blue-900 transition"
            >
              Generate Barcode
            </button>
          </form>

          {path && (
            <a
              href={path}
              download="barcode.png"
              className="mt-6 inline-block text-blue-700 hover:text-blue-900 font-semibold"
            >
              Download Barcode
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export default AddProduct;
