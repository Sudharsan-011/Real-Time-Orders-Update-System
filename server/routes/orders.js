const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// GET all orders
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// CREATE new order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE order
router.put("/:id", async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  console.log("CONSOLE LOG OF UPDATE" + JSON.stringify(req.body));
  res.json(updatedOrder);
});

// DELETE order
router.delete("/:id", async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted" });
});

module.exports = router;
