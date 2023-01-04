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
    let checkCustomer=await customerModel.findById(customerId)
    
      let currPrice
      if(checkCustomer.categorized=="gold"){
        currPrice=(price-(price*10/100))
      }else if(checkCustomer.categorized=="platinum"){
        currPrice=(price-(price*20/100))
      }else{
        currPrice=price
      }
    let makeOrder = await orderModel.create(productDetails);
    await customerModel.findOneAndUpdate({ _id: customerId },{ $inc: { totalOrder: +1 } });
    if(checkCustomer.orderCount>=10&&checkCustomer.orderCount<20){
      await customerModel.findByIdAndUpdate({_id:customerId},{$set:{categorized:"gold"}})
      
    }else if(checkCustomer.orderCount>=20){
      await customerModel.findByIdAndUpdate({_id:customerId},{$set:{categorized:"platinum"}})
    }
    return res.status(201).send({ status: true, data: makeOrder });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { orderDetails };
