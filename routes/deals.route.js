const express = require("express");
const router = express.Router();
const dealsController = require("../controllers/deals.controller");
const dealsMiddleware = require("../middleware/deal.middleware");

router.get("/", dealsMiddleware.validateQueryParams, dealsController.getDeals);
router.post("/", dealsMiddleware.validateCreateDeal, dealsController.postDeals);

module.exports = router;
