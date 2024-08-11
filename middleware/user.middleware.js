const validateBodyFields = (body) => {
  const allowedFields = ["email", "apiKey", "appId"];
  const receivedFields = Object.keys(body);

  const invalidFields = receivedFields.filter(
    (field) => !allowedFields.includes(field)
  );

  if (invalidFields.length > 0) {
    return false;
  }

  return true;
};

const isUuid = (id) => {
  if (typeof id !== "string") {
    return false;
  }

  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
    id
  );
};

const isEmail = (email) => {
  if (typeof email !== "string") {
    return false;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

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
    const { email, apiKey, appId } = req.body;
    if (!validateBodyFields(req.body)) {
      return res.status(400).json({
        message: "Invalid fields",
        invalidFields: invalidFields,
      });
    }

    if (!email || !isEmail(email)) {
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
  validateUpdateUser: (req, res, next) => {
    const { id } = req.params;
    const { email, apiKey, appId } = req.body;

    if (!id || !isUuid(id)) {
      return res.status(400).json({
        message: "Invalid id format",
      });
    }

    if (!validateBodyFields(req.body)) {
      return res.status(400).json({
        message: "Invalid fields",
        invalidFields: invalidFields,
      });
    }

    if (email && !isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    if (apiKey && (typeof apiKey !== "string" || apiKey.length !== 32)) {
      return res.status(400).json({
        message: "Invalid apiKey format",
      });
    }

    if (appId && (typeof appId !== "string" || !appId.match(/^\d+$/))) {
      return res.status(400).json({
        message: "Invalid appId format",
      });
    }

    next();
  },
  validateDeleteUser: (req, res, next) => {
    const { id } = req.params;

    if (!id || !isUuid(id)) {
      return res.status(400).json({
        message: "Invalid id format",
      });
    }

    next();
  },
  validateGetUser: (req, res, next) => {
    const { id, email, apiKey } = req.query;

    console.log(id, email, apiKey);

    if (!id && !email && !apiKey) {
      return res.status(400).json({
        message: "Invalid query parameters",
      });
    }

    if (id && !isUuid(id)) {
      return res.status(400).json({
        message: "Invalid id format",
      });
    }

    if (email && !isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    if (apiKey && apiKey.length !== 32) {
      return res.status(400).json({
        message: "Invalid apiKey format",
      });
    }

    next();
  },
};

module.exports = userMiddleware;
