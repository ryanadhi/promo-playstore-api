const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const userMiddleware = require("../middleware/user.middleware");

router.get("/", userMiddleware.validateQueryParams, userController.getUsers);
router.post("/", userMiddleware.validateCreateUser, userController.postUsers);

module.exports = router;
