const prisma = require("../db/prisma");
const { AppType } = require("@prisma/client");

const dealsController = {
  getDeals: async (req, res) => {
    const deals = await prisma.deal.findMany();
    res.json({
      message: "Successfully fetched deals",
      data: deals.map(deal => ({
        ...deal,
        priceFrom: deal.priceFrom.toString(),
        priceTo: deal.priceTo.toString()
      })),
    });
  },
  postDeals: async (req, res) => {
    const { type, priceFrom, priceTo, ...otherData } = req.body;
    if (!Object.values(AppType).includes(type)) {
      return res.status(400).json({
        message: "Invalid Type",
        validTypes: Object.values(AppType),
      });
    }

    if (priceTo <= priceFrom) {
      return res.status(400).json({
        message: "PriceTo must be greater than PriceFrom",
      });
    }

    const deal = await prisma.deal.create({
      data: req.body,
    });
    const serializedDeal = {
      ...deal,
      priceFrom: deal.priceFrom.toString(),
      priceTo: deal.priceTo.toString(),
    };
    res.json({
      message: "Successfully posted deals",
      data: serializedDeal,
    });
  },
};

module.exports = dealsController;
