const userMiddleware = {
  validateQueryParams: (req, res, next) => {
    const { page = 1, pageSize = 10 } = req.query;

    const allowedQueryParams = ["page", "pageSize"];
    const receivedQueryParams = Object.keys(req.query);

    const invalidParams = receivedQueryParams.filter(
      (param) => !allowedQueryParams.includes(param)
    );

    if (invalidParams.length > 0) {
      return res.status(400).json({
        message: "Invalid query parameters",
        invalidParams: invalidParams,
      });
    }

    if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) {
      return res.status(400).json({
        message: "Invalid page or pageSize",
      });
    }

    next();
  },
  validateCreateUser: (req, res, next) => {
    const { email, apiKey, appId = "1" } = req.body;

    const allowedFields = ["email", "apiKey", "appId"];
    const receivedFields = Object.keys(req.body);

    const invalidFields = receivedFields.filter(
      (field) => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      return res.status(400).json({
        message: "Invalid fields",
        invalidFields: invalidFields,
      });
    }

    if (
      !email ||
      typeof email !== "string" ||
      !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    if (!apiKey || typeof apiKey !== "string" || apiKey.length !== 32) {
      return res.status(400).json({
        message: "Invalid apiKey format",
      });
    }

    if (!appId || typeof appId !== "string" || !appId.match(/^\d+$/)) {
      return res.status(400).json({
        message: "Invalid appId format",
      });
    }

    next();
  },
};

module.exports = userMiddleware;
