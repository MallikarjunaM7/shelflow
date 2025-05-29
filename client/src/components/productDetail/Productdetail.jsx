import React from "react";
import { useNavigate } from "react-router-dom";

function Productdetail({ product, destination }) {
    const navigate = useNavigate();
    const path = `/product/${destination}`;

    const handleNavigate = () => {
        navigate(path);
    };

    return (
        <div className="flex justify-center items-start p-8 bg-[#e0e5ec]">
            <div
                className="
                    w-72 p-5 rounded-[15px] 
                    bg-gradient-to-br from-[#8EC5FC] to-[#E0C3FC]
                    text-white
                    shadow-[6px_6px_15px_rgba(184,192,204,0.7),_-6px_-6px_15px_#ffffff] 
                    transition-transform transition-shadow border border-transparent 
                    bg-clip-padding cursor-pointer 
                    hover:-translate-y-1 hover:shadow-[10px_10px_20px_rgba(184,192,204,0.8),_-10px_-10px_20px_#ffffff] 
                    hover:border-[#8EC5FC]
                "
                onClick={handleNavigate}
            >
                <h1 className="text-xl font-bold text-center mb-4 tracking-widest">
                    Product Details
                </h1>

                <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between">
                        <span className="font-semibold">Product Name:</span>
                        <span className="pl-2 hover:text-blue-100">
                            {product.productname ?? "0"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Quantity:</span>
                        <span className="pl-2 hover:text-blue-100">
                            {product.quantity ?? "0"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Price:</span>
                        <span className="pl-2 hover:text-blue-100">
                            ₹{product.price ?? "0"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Total Sold:</span>
                        <span className="pl-2 hover:text-blue-100">
                            {product.total_sold ?? "0"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Revenue Generated:</span>
                        <span className="pl-2 hover:text-blue-100">
                            ₹{product.revenue_generated ?? "0"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Product Threshold:</span>
                        <span className="pl-2 hover:text-blue-100">
                            {product.productthreshold ?? "0"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Supplier Name:</span>
                        <span className="pl-2 hover:text-blue-100">
                            {product.supplierName ?? "0"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Productdetail;
