const { AppType } = require("@prisma/client");

const dealsMiddleware = {
  validateQueryParams: (req, res, next) => {
    const {
      page = 1,
      pageSize = 1,
      type = "all",
      isFree = false,
      orderBy = "createdAt",
      order = "desc",
    } = req.query;

    if (type !== "all" && !Object.values(AppType).includes(type)) {
      return res.status(400).json({
        message: "Invalid Type",
        validTypes: Object.values(AppType),
      });
    }

    if (isFree !== "true" && isFree !== "false") {
      return res.status(400).json({
        message: "Invalid isFree",
        validTypes: ["true", "false"],
      });
    }

    if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) {
      return res.status(400).json({
        message: "Invalid page or pageSize",
      });
    }

    if (
      orderBy !== "createdAt" &&
      orderBy !== "priceFrom" &&
      orderBy !== "priceTo"
    ) {
      return res.status(400).json({
        message: "Invalid orderBy",
        validTypes: ["createdAt", "priceFrom", "priceTo"],
      });
    }

    if (order.toLowerCase() !== "asc" && order.toLowerCase() !== "desc") {
      return res.status(400).json({
        message: "Invalid order",
        validTypes: ["asc", "desc"],
      });
    }

    next();
  },
};

module.exports = dealsMiddleware;
