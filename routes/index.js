const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

const usersRouter = require("./users.route");
const dealsRouter = require("./deals.route");

router.use("/users", authMiddleware, usersRouter);
router.use("/deals", dealsRouter);

module.exports = router;
