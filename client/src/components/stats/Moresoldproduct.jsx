import React, { useState, useEffect } from 'react';
import './Moresoldproduct.css';
import Navbar from '../essentials/Navbar';
function ProductTable() {
    // State to store products data
    const [products, setProducts] = useState([]);
    const [shopid, setShopid] = useState(localStorage.getItem("shopid"))

    // Fetch the data when the component mounts
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:5000/api/auth/soldproducts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ shopid: `${shopid}` }),
                });

                const message = await response.json();
                if (message.items) {
                    setProducts(message.items); // Update state with fetched data
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchData();
    }, []); // Empty dependency array ensures the fetch runs only once when the component mounts

    return (
        <>
        <Navbar />
        <div className="product-table-container">
            <h2 className="product-table-title">More Sold Product</h2>
            <table className="product-table">
                <thead>
                    <tr>
                        <th className="product-table-header">Product Name</th>
                        <th className="product-table-header">Total Sold</th>
                        <th className="product-table-header">Price</th>
                        <th className="product-table-header">Quantity</th>
                        <th className="product-table-header">Revenue Generated</th>
                        <th className="product-table-header">Product Threshold</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <tr key={index} className="product-table-row">
                                <td className="product-table-cell">{product.productname}</td>
                                <td className="product-table-cell">{product.total_sold}</td>
                                <td className="product-table-cell">₹{product.price}</td>
                                <td className="product-table-cell">{product.quantity}</td>
                                <td className="product-table-cell">₹{product.revenue_generated}</td>
                                <td className="product-table-cell">{product.productthreshold}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="product-table-cell" colSpan="6">No products found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default ProductTable;
