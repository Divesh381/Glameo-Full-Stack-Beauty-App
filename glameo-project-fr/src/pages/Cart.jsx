import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "CHEECO Oil Burner Candle Diffuser",
      price: 129,
      discount: 6,
      finalPrice: 123,
      quantity: 1,
      size: "Free Size",
      seller: "Charu E-commerce",
      image: "https://picsum.photos/80?random=1",
    },
  ]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check user authentication status (assuming token is stored in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {!isLoggedIn ? (
        <div className="text-center py-10">
          <img src="/login-required.png" alt="Login Required" className="mx-auto w-40" />
          <h2 className="text-xl font-bold mt-4">Login to access your cart</h2>
          <p className="text-gray-500">Please sign in to continue shopping.</p>
          <button onClick={handleLoginRedirect} className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg">
            Login
          </button>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-10">
          <img src="/empty-cart.png" alt="Empty Cart" className="mx-auto w-40" />
          <h2 className="text-xl font-bold mt-4">Your cart is empty</h2>
          <p className="text-gray-500">Start shopping now!</p>
          <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {/* Left Side - Product Details */}
          <div className="col-span-2 bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold border-b pb-2">Product Details</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md" />
                <div className="flex-1 px-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">
                    ₹<s>{item.price}</s> <span className="text-green-600">5% Off</span>
                  </p>
                  <p className="text-sm text-gray-500">Size: {item.size} • Qty: {item.quantity}</p>
                  <button className="text-red-500 flex items-center mt-2" onClick={() => removeItem(item.id)}>
                    <FaTrash className="mr-2" /> REMOVE
                  </button>
                </div>
                <button className="text-purple-600 flex items-center">
                  <FaEdit className="mr-1" /> EDIT
                </button>
              </div>
            ))}
            <p className="text-gray-500 mt-2">Sold by: {cartItems[0].seller} • Free Delivery</p>
          </div>

          {/* Right Side - Price Details */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold border-b pb-2">Price Details ({cartItems.length} Items)</h2>
            <div className="py-4">
              <div className="flex justify-between">
                <p>Total Product Price</p>
                <p>₹{cartItems[0].price}</p>
              </div>
              <div className="flex justify-between text-green-600">
                <p className="underline cursor-pointer">Total Discounts</p>
                <p>- ₹{cartItems[0].discount}</p>
              </div>
            </div>
            <div className="border-t py-4 flex justify-between font-bold text-lg">
              <p>Order Total</p>
              <p>₹{cartItems[0].finalPrice}</p>
            </div>
            <div className="bg-green-100 text-green-700 text-sm p-2 rounded-md mb-4 flex items-center">
              🎉 Yay! Your total discount is ₹{cartItems[0].discount}
            </div>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg">
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
