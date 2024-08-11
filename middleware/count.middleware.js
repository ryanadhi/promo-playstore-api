const prisma = require("../db/prisma");

const countMiddleware = {
  validateCount: async (req, res, next) => {
    if (req.user && req.user.appId !== 0) {
      if (req.user.count > Number(process.env.DAILY_MAX_COUNT)) {
        return res.status(400).json({
          message: "Daily limit reached",
        });
      } else {
        await prisma.user.update({
          where: { id: req.user.id },
          data: { count: { increment: 1 } },
        });
      }
    }

    next();
  },
};

module.exports = countMiddleware;
