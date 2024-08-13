const { AppType } = require("@prisma/client");

const isValidUrl = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (err) {
    return false;
  }
};

const isNumber = (value) => {
  return !isNaN(value);
};

const validateBody = (body) => {
  const allowedFields = [
    "title",
    "description",
    "imageUrl",
    "url",
    "type",
    "priceFrom",
    "priceTo",
  ];
  const extraFields = Object.keys(body).filter(
    (field) => !allowedFields.includes(field)
  );

  if (extraFields.length > 0) {
    return false;
  }

  return true;
};

const dealsMiddleware = {
  validateQueryParams: (req, res, next) => {
    const {
      page = 1,
      pageSize = 1,
      type = "all",
      isFree = "false",
      orderBy = "createdAt",
      order = "desc",
    } = req.query;

    const allowedQueryParams = [
      "page",
      "pageSize",
      "type",
      "isFree",
      "orderBy",
      "order",
    ];
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
  validateCreateDeal: (req, res, next) => {
    const { title, description, imageUrl, url, type, priceFrom, priceTo } =
      req.body;

    if (!validateBody(req.body)) {
      return res.status(400).json({
        message: "Invalid request body. Extra fields are not allowed.",
        invalidFields: extraFields,
      });
    }

    if (
      !title ||
      !url ||
      !type ||
      priceFrom === undefined ||
      priceTo === undefined
    ) {
      return res.status(400).json({
        message: "Invalid request body. Missing required fields.",
      });
    }

    if (isNaN(priceFrom) || isNaN(priceTo) || priceFrom < 0 || priceTo < 0) {
      return res.status(400).json({
        message: "Invalid priceFrom or priceTo",
      });
    }

    if (!isValidUrl(url)) {
      return res.status(400).json({
        message: "Invalid URL format",
      });
    }

    if (!Object.values(AppType).includes(type)) {
      return res.status(400).json({
        message: "Invalid type",
        validTypes: Object.values(AppType),
      });
    }

    if (Number(priceTo) >= Number(priceFrom)) {
      return res.status(400).json({
        message: "PriceTo must be greater than PriceFrom",
      });
    }

    if (imageUrl && !isValidUrl(imageUrl)) {
      return res.status(400).json({
        message: "Invalid image URL format",
      });
    }

    if (description && description.length > 1000) {
      return res.status(400).json({
        message: "Description is too long",
      });
    }

    next();
  },
  validateUpdateDeal: (req, res, next) => {
    const { id } = req.params;
    const { description, imageUrl, url, type, priceFrom, priceTo } =
      req.body;

    if (!validateBody(req.body)) {
      return res.status(400).json({
        message: "Invalid request body. Extra fields are not allowed.",
        invalidFields: extraFields,
      });
    }

    if (!id || !isUuid(id)) {
      return res.status(400).json({
        message: "Invalid id format",
      });
    }

    if (priceFrom && (isNaN(priceFrom) || priceFrom < 0)) {
      return res.status(400).json({
        message: "Invalid priceFrom",
      });
    }

    if (priceTo && (isNaN(priceTo) || priceTo < 0)) {
      return res.status(400).json({
        message: "Invalid priceTo",
      });
    }

    if (priceFrom && priceTo && Number(priceFrom) >= Number(priceTo)) {
      return res.status(400).json({
        message: "PriceTo must be greater than PriceFrom",
      });
    }

    if (type && !Object.values(AppType).includes(type)) {
      return res.status(400).json({
        message: "Invalid type",
        validTypes: Object.values(AppType),
      });
    }

    if (url && !isValidUrl(url)) {
      return res.status(400).json({
        message: "Invalid URL format",
      });
    }

    if (imageUrl && !isValidUrl(imageUrl)) {
      return res.status(400).json({
        message: "Invalid image URL format",
      });
    }

    if (description && description.length > 1000) {
      return res.status(400).json({
        message: "Description is too long",
      });
    }
  },
  validateDeleteDeal: (req, res, next) => {
    const { id } = req.params;

    if (!id || !isNumber(id)) {
      return res.status(400).json({
        message: "Invalid id format",
      });
    }

    next();
  },
  validateGetDeal: (req, res, next) => {
    const { id } = req.params;

    if (!id || !isNumber(id)) {
      return res.status(400).json({
        message: "Invalid id format",
      });
    }

    next();
  },
};

module.exports = dealsMiddleware;
