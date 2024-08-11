const express = require("express");
const router = express.Router();
const dealsController = require("../controllers/deals.controller");
const dealsMiddleware = require("../middleware/dealsMiddleware");

router.get("/", dealsMiddleware.validateQueryParams, dealsController.getDeals);
router.post("/", dealsController.postDeals);

module.exports = router;
