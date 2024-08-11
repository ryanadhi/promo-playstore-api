const express = require("express");
const router = express.Router();
const dealsController = require("../controllers/deals.controller");
const dealsMiddleware = require("../middleware/deal.middleware");
const countMiddleware = require("../middleware/count.middleware");

router.get("/", countMiddleware.validateCount, dealsMiddleware.validateQueryParams, dealsController.getDeals);
router.post("/", dealsMiddleware.validateCreateDeal, dealsController.postDeals);
router.get("/:id", countMiddleware.validateCount, dealsMiddleware.validateGetDeal, dealsController.getById);
router.put(
  "/:id",
  dealsMiddleware.validateUpdateDeal,
  dealsController.updateById
);
router.delete(
  "/:id",
  dealsMiddleware.validateDeleteDeal,
  dealsController.deleteById
);

module.exports = router;
