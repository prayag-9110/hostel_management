const express = require("express");

/* ROUTER */
const router = express.Router();

const {
  addNewFee,
  collectFee,
  getStudentByRollNumber,
  revertFee,
  addPanelty,
  clearPanelty,
  deleteFee,
  getDueFeeStudent,
  generateReceipt,
  getLastTenDaysCollection
} = require("../controllers/accountantController");
const { protectUser } = require("../middlewares/userProtect");

router.post("/addNewFee", addNewFee);
router.post("/collectFee", collectFee);
router.get("/getStudentByRollNumber", getStudentByRollNumber);
router.post("/revertFee", revertFee);
router.post("/addPanelty", addPanelty);
router.post("/clearPanelty", clearPanelty);
router.post("/deleteFee", deleteFee);
router.post("/getDueFeeStudent", getDueFeeStudent);
router.post("/generateReceipt", generateReceipt);
router.get("/getLastTenDaysCollection", getLastTenDaysCollection);


module.exports = router;
