const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const authenticateToken = require("../middleware/middleware"); //
// Define data routes
router.post("/store", authenticateToken, dataController.storeData);
router.get("/retrieve/:keyN", authenticateToken, dataController.retrieveData);
router.put("/update/:keyN", authenticateToken, dataController.updateData);
router.delete("/delete/:keyN", authenticateToken, dataController.deleteData);

module.exports = router;
