import React, { useState, useEffect } from 'react';
import Navbar from '../essentials/Navbar';

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [shopid] = useState(localStorage.getItem("shopid"));

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/api/auth/soldproducts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shopid }),
        });

        const message = await response.json();
        if (message.items) {
          setProducts(message.items);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchData();
  }, [shopid]);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          More Sold Product
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead className="bg-green-600 text-white">
              <tr>
                {[
                  "Product Name",
                  "Total Sold",
                  "Price",
                  "Quantity",
                  "Revenue Generated",
                  "Product Threshold",
                ].map((header) => (
                  <th
                    key={header}
                    className="text-left px-6 py-4 font-bold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, idx) => (
                  <tr
                    key={idx}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                    } hover:bg-green-50 transition-colors`}
                  >
                    <td className="px-6 py-3 font-semibold text-gray-800 border-b border-gray-200">
                      {product.productname}
                    </td>
                    <td className="px-6 py-3 text-gray-600 border-b border-gray-200">
                      {product.total_sold}
                    </td>
                    <td className="px-6 py-3 text-gray-600 border-b border-gray-200">
                      ₹{product.price}
                    </td>
                    <td className="px-6 py-3 text-gray-600 border-b border-gray-200">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-3 text-gray-600 border-b border-gray-200">
                      ₹{product.revenue_generated}
                    </td>
                    <td className="px-6 py-3 text-gray-600 border-b border-gray-200">
                      {product.productthreshold}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center px-6 py-4 text-gray-500"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ProductTable;
