const express = require("express");
const router = express.Router();
const { registerCustomer } = require("../controller/customerController");
const { orderDetails } = require("../controller/orderController");


router.post("/register", registerCustomer);

router.post("/placeorder/:id", orderDetails);

module.exports = router;
