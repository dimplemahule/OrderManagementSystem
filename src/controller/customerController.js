const customerModel = require("../models/customerModel");

const phoneRegex = /^[0-9]{10}$/;
const isValidString = function (x) {
  if (typeof x === "undefined" || x === null) return false;
  if (typeof x != "string") return false;
  if (typeof x === "string" && x.trim().length === 0) return false;
  return true;
};

const registerCustomer = async (req, res) => {
  try {
    let customerDetails = req.body;
    let { firstName, lastName, phone, category, totalOrder } = customerDetails;
    if (!firstName) {
      return res.status(400).send({ status: false, msg: "name is required" });
    }
    if (!isValidString(firstName)) {
      return res.status(400).send({ status: false, msg: "firstName is not valid" });
    }

    if (!lastName) {
      return res.status(400).send({ status: false, msg: "name is required" });
    }
    if (!isValidString(lastName)) {
      return res.status(400).send({ status: false, msg: "lastName is not valid" });
    }

    if (!phone) {
      return res.status(400).send({ status: false, msg: "phone is requird" });
    }
    if (!phoneRegex.test(phone)) {
      return res.status(400).send({ status: false, msg: "Phone number is not valid" });
    }

    let createdData = await customerModel.create(customerDetails);
    return res.status(201).send({ status: true, data: createdData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { registerCustomer };
