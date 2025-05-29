import React, { useEffect, useState } from "react";
import { Package, User, Mail, DollarSign, Download, Sparkles, ShoppingBag } from "lucide-react";
import Navbar from "../essentials/Navbar";

// Mock Navbar component since we don't have the original
// const Navbar = () => (
//   <nav className="bg-white shadow-sm border-b border-gray-200">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="flex justify-between h-16">
//         <div className="flex items-center">
//           <ShoppingBag className="h-8 w-8 text-blue-600" />
//           <span className="ml-2 text-xl font-bold text-gray-900">ShopManager</span>
//         </div>
//       </div>
//     </div>
//   </nav>
// );

function AddProduct() {
  const [imgSource, setImageSource] = useState("");
  const [path, setPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const backApi = `http://localhost:5000`;
  // Note: Using state instead of localStorage for demo purposes
  const [shopid, setShopid] = useState("demo-shop-123");

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
    setIsLoading(true);
    setIsSuccess(false);
    console.log("Submitted Data:", formData);

    try {
      // Simulating API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response
      const mockImageSource = `barcode_${Date.now()}.png`;
      setImageSource(mockImageSource);
      setIsSuccess(true);
      
      /* Original API call (commented for demo):
      const response = await fetch(`${backApi}/api/auth/insertproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, shopid: shopid }),
      });
      const message = await response.json();
      setImageSource(message.imagesource);
      */
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
              <Package className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Add New Product
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Fill in the product details below to generate a unique barcode for your inventory
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-8 py-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Product Name */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Package className="h-4 w-4 mr-2 text-blue-600" />
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Supplier Name */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <User className="h-4 w-4 mr-2 text-green-600" />
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    name="supplierName"
                    value={formData.supplierName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter supplier name"
                    required
                  />
                </div>

                {/* Supplier Email */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Mail className="h-4 w-4 mr-2 text-purple-600" />
                    Supplier Email
                  </label>
                  <input
                    type="email"
                    name="supplierEmail"
                    value={formData.supplierEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="supplier@example.com"
                    required
                  />
                </div>

                {/* Price */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <span className="h-4 w-4 mr-2 text-yellow-600 text-lg font-semibold">₹</span>
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Generating Barcode...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate Barcode
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Success Message & Download */}
            {isSuccess && path && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-t border-green-200 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-semibold text-green-800">
                        Barcode Generated Successfully!
                      </h3>
                      <p className="text-sm text-green-600">
                        Your product barcode is ready for download
                      </p>
                    </div>
                  </div>
                  <a
                    href={path}
                    download="barcode.png"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Additional Info Card */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">How it works</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <p className="text-sm text-gray-600">Fill in product details</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <p className="text-sm text-gray-600">Generate unique barcode</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <p className="text-sm text-gray-600">Download and use</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;