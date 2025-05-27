import React, { useEffect, useState } from "react";
import "./Addproduct.css";
import Navbar from "../essentials/Navbar";
function AddProduct() {
  const [imgSource, setImageSource] = useState("");
  const [path, setPath] = useState("");
  const backApi = `http://localhost:5000`;
  const [shopid, setShopid] = useState(localStorage.getItem("shopid"))
  

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
        body: JSON.stringify({...formData, shopid: shopid}),
      });
      const message = await response.json();
      setImageSource(message.imagesource); // Backend should return the filename of the image
    } catch (error) {
      console.log(error);
    }
  };

  // Update path whenever imgSource is updated
  useEffect(() => {
    if (imgSource) {
      setPath(`/images/${imgSource}`);
    }
  }, [imgSource]);

  return (
    <>
    <Navbar />
    <div className="app-background1">
      <div className="form-container1">
        <h1 className="form-heading1">Product Information</h1>
        <form className="form1" onSubmit={handleSubmit}>
          <label className="form-label1">
            Product Name:
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="form-input1"
              required
            />
          </label>

          <label className="form-label1">
            Supplier Name:
            <input
              type="text"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              className="form-input1"
              required
            />
          </label>

          <label className="form-label1">
            Supplier Email:
            <input
              type="email"
              name="supplierEmail"
              value={formData.supplierEmail}
              onChange={handleChange}
              className="form-input1"
              required
            />
          </label>

          <label className="form-label1">
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-input1"
              required
            />
          </label>

          <button type="submit" className="form-button1">Generate Barcode</button>
        </form>
      </div>

      {/* Display download link only if path is set */}
      <div>
        {path && (
          <a href={path} download="barcode.png" className="download-button">
            Download Barcode
          </a>
        )}
      </div>
    </div>
    </>
  );
}

export default AddProduct;
