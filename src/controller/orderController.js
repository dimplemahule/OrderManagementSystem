const { findOne, findOneAndUpdate } = require("mongoose");
const customerModel = require("../models/customerModel");
const orderModel = require("../models/orderModel");
const ObjectId = require("mongoose").Types.ObjectId;

const orderDetails = async (req, res) => {
  try {
    let productDetails = req.body;
    let customerId = req.params.id;
    let { product, price } = productDetails;
    productDetails.customerId = customerId;
    if (!customerId) {
      return res.status(400).send({ status: false, msg: "Please enter customer id!" });
    }
    if (!ObjectId.isValid(customerId)) {
      return res.status(400).send({ status: false, msg: "Invalid customer id!" });
    }
    if (!product) {
      return res.status(400).send({ status: false, msg: "Please enter product name!" });
    }
    if (!price) {
      return res.status(400).send({ status: false, msg: "Please enter product price!" });
    }
    let makeOrder = await orderModel.create(productDetails);
    await customerModel.findOneAndUpdate(
      { _id: customerId },
      { $inc: { totalOrder: +1 } }
    );
    return res.status(201).send({ status: true, data: makeOrder });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { orderDetails };
