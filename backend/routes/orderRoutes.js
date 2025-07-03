const express = require("express");
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus } = require("../controllers/orderController.js");

router.post("/", createOrder);
router.get("/", getOrders);
router.patch("/:id", updateOrderStatus);

module.exports = router;
