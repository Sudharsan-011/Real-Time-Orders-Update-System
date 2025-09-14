import { useState } from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "../features/orders/ordersSlice";

export default function OrderForm() {
  const [customer_name, setCustomer] = useState("");
  const [product_name, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createOrder({ customer_name, product_name, quantity, status: "pending" }));
    setCustomer("");
    setProduct("");
    setQuantity(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">Add New Order</h2>

      <input
        type="text"
        placeholder="Customer Name"
        value={customer_name}
        onChange={(e) => setCustomer(e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="Product Name"
        value={product_name}
        onChange={(e) => setProduct(e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="number"
        min="1"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition font-semibold"
      >
        Add Order
      </button>
    </form>
  );
}
