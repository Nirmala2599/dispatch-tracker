const PurchaseOrder = require("../models/PurchaseOrder");

exports.getAllPO = async (req, res) => {
  try {
    const data = await PurchaseOrder.find().sort({
      createdAt: -1,
    });

    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createPO = async (req, res) => {
  try {
    const po = new PurchaseOrder(req.body);
    await po.save();
    res.status(201).json(po);
  }catch (error) {
    console.log(error);
    res.status(400).json({
        message: error.message,
        error
    });
}
};
exports.getAllPO = async (req, res) => {
  try {
    const data = await PurchaseOrder.find().sort({
      createdAt: -1,
    });

    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.updateDispatch = async (req, res) => {
  try {

    const updatedPO =
      await PurchaseOrder.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedPO);

  } catch (error) {
    res.status(500).json(error);
  }
};
exports.deletePO = async (req, res) => {
  try {
    await PurchaseOrder.findByIdAndDelete(req.params.id);

    res.json({
      message: "Purchase Order Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json(error);
  }
};