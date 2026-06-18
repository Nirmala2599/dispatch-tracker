const express = require("express");
const router = express.Router();

const {
  createPO,
  getAllPO,
  updateDispatch,
   deletePO
} = require("../controllers/poController");

router.post("/", createPO);
// router.get("/", (req,res)=>{
//    res.send("PO Route Working");
// });
router.get("/",getAllPO);
router.put("/:id", updateDispatch);
router.delete("/:id", deletePO);

module.exports = router;