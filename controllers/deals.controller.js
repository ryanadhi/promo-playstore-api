const prisma = require("../db/prisma");
const { AppType } = require("@prisma/client");

const dealsController = {
  getDeals: async (req, res) => {
    const {
      page = 1,
      pageSize = 1,
      type = "all",
      isFree = "false",
      orderBy = "createdAt",
      order = "desc",
    } = req.query;

    const where = type !== "all" ? { type } : {};

    if (isFree === "true") {
      where.priceTo = 0;
    }

    const deals = await prisma.deal.findMany({
      where,
      skip: (Number(page) - 1) * Number(pageSize),
      take: Number(pageSize),
      orderBy: {
        [orderBy]: order.toLowerCase(),
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        url: true,
        type: true,
        priceFrom: true,
        priceTo: true,
      },
    });
    const totalDeals = await prisma.deal.count();
    const totalPages = Math.ceil(totalDeals / pageSize);
    res.json({
      message: "Successfully fetched deals",
      data: deals.map((deal) => ({
        ...deal,
        priceFrom: deal.priceFrom.toString(),
        priceTo: deal.priceTo.toString(),
      })),
      totalPages,
      totalDeals,
    });
  },
  postDeals: async (req, res) => {
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
  deleteById: async (req, res) => {
    const { id } = req.params;

    const deal = await prisma.deal.findUnique({
      where: { id: Number(id) },
    });
    if (!deal) {
      return res.status(404).json({
        message: "Deal not found",
      });
    }
    await prisma.deal.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: "Successfully deleted deal",
    });
  },
  updateById: async (req, res) => {
    const { id } = req.params;

    const deal = await prisma.deal.findUnique({
      where: { id: Number(id) },
    });
    if (!deal) {
      return res.status(404).json({
        message: "Deal not found",
      });
    }

    await prisma.deal.update({
      where: { id: Number(id) },
      data: { ...deal, ...req.body },
    });
    res.json({
      message: "Successfully updated deal",
    });
  },
  getById: async (req, res) => {
    const { id } = req.params;
    const deal = await prisma.deal.findUnique({
      where: { id: Number(id) },
    });
    if (!deal) {
      return res.status(404).json({
        message: "Deal not found",
      });
    }
    const serializedDeal = {
      ...deal,
      priceFrom: deal.priceFrom.toString(),
      priceTo: deal.priceTo.toString(),
    };
    res.json({
      message: "Successfully fetched deal",
      data: serializedDeal,
    });
  },
};

module.exports = dealsController;
