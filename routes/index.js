const express = require("express");
const router = express.Router();

const usersRouter = require("./users.route");
const dealsRouter = require("./deals.route");

router.use("/users", usersRouter);
router.use("/deals", dealsRouter);

module.exports = router;
