import React from "react";
import { useNavigate } from "react-router-dom"; // For React Router v6
import './Productdetail.css';

function Productdetail({ product, destination }) {
    const navigate = useNavigate();

    const path = `/product/${destination}`; // Path to navigate to

    const handleNavigate = () => {
        navigate(path); // This will programmatically navigate to the path
    };

    return (<div>
        
        <div className="product-card-container"style={{marginBottom:'0px'}}>
            {/* Make the parent div clickable */}
            <div className="product-card highlight-background" onClick={handleNavigate}>
                <h1 className="product-card-title">Product Details</h1>
                <div className="product-card-info">
                    <div className="product-info-item">
                        <span className="label">Product Name:</span>
                        <span className="value">{product.productname !== undefined ? product.productname : "0"}</span>
                    </div>
                    <div className="product-info-item">
                        <span className="label">Quantity:</span>
                        <span className="value">{product.quantity !== undefined ? product.quantity : "0"}</span>
                    </div>
                    <div className="product-info-item">
                        <span className="label">Price:</span>
                        <span className="value">₹{product.price !== undefined ? product.price : "0"}</span>
                    </div>
                    <div className="product-info-item">
                        <span className="label">Total Sold:</span>
                        <span className="value">{product.total_sold !== undefined ? product.total_sold : "0"}</span>
                    </div>
                    <div className="product-info-item">
                        <span className="label">Revenue Generated:</span>
                        <span className="value">₹{product.revenue_generated !== undefined ? product.revenue_generated : "0"}</span>
                    </div>
                    <div className="product-info-item">
                        <span className="label">Product Threshold:</span>
                        <span className="value">{product.productthreshold !== undefined ? product.productthreshold : "0"}</span>
                    </div>
                    <div className="product-info-item">
                        <span className="label">Supplier Name:</span>
                        <span className="value">{product.supplierName !== undefined ? product.supplierName : "0"}</span>
                    </div>
                </div>
            </div>
        </div>
        
        </div>
    );
}

export default Productdetail;
