import { fetchOrders, deleteOrder, updateOrder } from "./ordersSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OrdersList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.orders);
  const [editingOrder, setEditingOrder] = useState(null);

  const handleEditClick = (order) => {
    setEditingOrder(order);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedOrder = {
      customer_name: form.customer_name.value,
      product_name: form.product_name.value,
      quantity: Number(form.quantity.value),
      status: form.status.value,
    };
    dispatch(updateOrder({ id: editingOrder._id, data: updatedOrder }));
    setEditingOrder(null);
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === "loading") return <p className="text-gray-500">Loading...</p>;
  if (status === "failed") return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Orders</h2>

      <ul className="space-y-4">
        {items.map((order) => (
          <li
            key={order._id}
            className="flex justify-between items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold text-gray-700">{order.customer_name}</p>
              <p className="text-gray-500">
                {order.quantity} × {order.product_name} —{" "}
                <span
                  className={`font-medium ${
                    order.status === "pending"
                      ? "text-yellow-500"
                      : order.status === "delivered"
                      ? "text-green-500"
                      : "text-blue-500"
                  }`}
                >
                  {order.status}
                </span>
              </p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleEditClick(order)}
                className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => dispatch(deleteOrder(order._id))}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                ❌ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Edit Order</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                name="customer_name"
                defaultValue={editingOrder.customer_name}
                placeholder="Customer Name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                name="product_name"
                defaultValue={editingOrder.product_name}
                placeholder="Product Name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                name="quantity"
                defaultValue={editingOrder.quantity}
                placeholder="Quantity"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
                name="status"
                defaultValue={editingOrder.status}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="pending">Pending</option>
                <option value="delivered">Delivered</option>
                <option value="shipped">Shipped</option>
              </select>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
                  className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 ml-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
