import React, { useEffect, useState } from 'react';
import {Navigate} from "react-router-dom"
import { useAuth } from '../../store/auth';
import toast from "react-hot-toast"
import './sellProduct.css'
import Navbar from '../components/essentials/Navbar';
const AddByBarcodeScanner = () => {

    const [data, setData] = useState("")
    const [items, setItems] = useState("")
    const [amountInput, setAmountInput] = useState(false)
    const [itemDetails, setItemDetails] = useState([])
    const [amount, setAmount] = useState({quantity: 0, expDate: "", productname: ''})
    const {token} = useAuth()
    const [add, setAdd] = useState(false)
    const [incart, setIncart] = useState([])
    const [table, setTable] = useState(false)
    const [shopid, setShopid] = useState(localStorage.getItem("shopid"))

    const backapi = "http://localhost:5000"

    const startScanner =async () => {
        const targetElement = document.querySelector('#interactive');
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: targetElement, // Target element
                constraints: {
                    facingMode: "environment" // Use the back camera
                }
            },
            decoder: {
                readers: ["code_128_reader"] // Add other readers as needed
            }
        }, function(err) {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });

        // Register the onDetected event
        Quagga.onDetected(function(result) {
            const code = result.codeResult.code;
            console.log(data, "dataaaaa")
            console.log(`Code detected: ${code}`);
            document.getElementById('result').innerText = `Scanned Code: ${code}`;

            Quagga.stop();
            setData(code)
        });

    }

    
    
    useEffect(() => {
        // Initialize Quagga
        console.log("Loaded")

        startScanner();
        

        
    }, []); 

    useEffect(() => {
        if(data.length > 0)
        {
            const fetchdata = async(res, req) => {
                console.log(data, "inside function")
                const response = await fetch("http://localhost:5000/api/auth/scanproduct", {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({data: data})
                })
                const message = await response.json();
                console.log(message)

                if(message.productname != "Scan Again")
                {
                    setAmountInput(true)
                    setItems(message.productname)
                }else{
                    toast.error("Product Not Found Scan Again")
                }
            }

            fetchdata()
        }
        
    }, [data])

    const handleScan = () => {
        setData("")
        setAmountInput(false)
        setItems("")
        startScanner()
    }

    useEffect(() => {
        console.log("sssssssssssssssssss", items)
    }, [items])


    const handleAdd = async(e) => {
        e.preventDefault()
        setAmountInput(false)
        amount.productname = items;
        const response = await fetch("http://localhost:5000/api/auth/addorder", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...amount, shopid: shopid})
        })
    }

    // const addToCart = async() => {
    //     console.log(itemDetails)
    //     const response = await fetch(`${backapi}/api/auth/addtocart`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": `application/json`,
    //             Authorization: `Bearer ${token}`,
    //             ShopID: shopid
    //         },
    //         body: JSON.stringify(itemDetails[itemDetails.length - 1])
    //     })
    //     await getCartItems()
    // }

    // useEffect(() => {
    //     console.log("itemdetails", itemDetails)
    //     if(itemDetails.length > 0){
    //         addToCart()
    //     }
    // }, [itemDetails])

    const handleAmount = (e) => {
        const {name, value} = e.target;
        console.log(name, value)
        setAmount({...amount, [name]: value})
    }

    const deleteUserById = async(itemId) => {
        console.log(itemId)
        console.log(incart)
        const response = await fetch(`${backapi}/api/auth/deleteitemincart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`,
                shopid: `${shopid}`
            },
            body: JSON.stringify({itemId: itemId})
        })
        const data = await response.json();
        setIncart(data.cartItems)
    }

    const handleUpdate = async() => {
        try {
            console.log(incart)
            const data = {cartItems: incart}
            console.log("data", data)
            const response = await fetch(`${backapi}/api/auth/updatestock`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    
                },
                body: JSON.stringify({...data, shopid: `${shopid}`,})
            })

            const result = await response.json();
            await getCartItems()

            if(result.success){
                toast.success(result.message)
            }else{
                result.errorItems.forEach(element => {
                    const available = element.quantity;
                    const productname = element.productname;
    
                    toast(
                        `${productname} insufficient! Only ${available} are available`,
                        {
                          duration: 5000,
                        }
                      );
                });
            }

        } catch (error) {
            console.log(error)
        }
    }

    

    if(!token)
        {
          return <Navigate to="/"/>
        }
      
    return (
       
       
       <>
            <Navbar>

       </Navbar>
       <div>
        
    
       
         <div className="scanner"style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
         
            <h1>Barcode Scanner</h1>
            <div id="interactive" style={{ width: '600px', height: '400px', border: '1px solid #ccc', marginBottom: '20px' }}></div>
            <div id="result" style={{marginTop:'20px',fontSize:'1.2em'}}></div>
       
        <div className='container'>
        {amountInput ? 
            <>
            
                <form onSubmit={handleAdd}  action="" className="form">
                    <input onChange={handleAmount} type="number" placeholder='Quantity' name='quantity' />
                    <input onChange={handleAmount} type="date" name='expDate'/>
                    <button  type='submit' className="btn">Add</button>
                </form>
               
            </> :
            <></>
        }
        <button onClick={handleScan} className='btn'>Scan Again</button>
        </div>
        </div>
        <div className="table-container">
      {/* <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {incart.map((item, index) => (
            <tr key={index}>
              <td>{item.productname}</td>
              <td>{item.quantity}</td>
              <td><button onClick={()=>{
                deleteUserById(item._id)
              }}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table> */}
      {/* <button onClick={handleUpdate}>Update Stocks</button> */}
    </div>
        </div>
       </>
       
    );
};


export default AddByBarcodeScanner;