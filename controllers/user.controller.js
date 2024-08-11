const prisma = require("../db/prisma");

const userController = {
  getUsers: async (req, res) => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        appId: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json({
      message: "Successfully get users",
      data: users,
    });
  },
  getByUnique: async (req, res) => {
    const { email, apiKey, id } = req.query;
    let whereClause = {};

    if (id) whereClause.id = id;
    if (email) whereClause.email = email;
    if (apiKey) whereClause.apiKey = apiKey;

    const user = await prisma.user.findFirst({
      where: whereClause,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "Successfully get user",
      data: user,
    });
  },
  deleteById: async (req, res) => {
    const { id } = req.params;

    const userCheck = await prisma.user.findUnique({
      where: { id },
    });

    if (!userCheck) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    res.json({
      message: "Successfully delete user",
      data: user,
    });
  },
  updateById: async (req, res) => {
    const { id } = req.params;
    const { email, apiKey, appId } = req.body;

    const userCheck = await prisma.user.findUnique({
      where: { id },
    });

    if (!userCheck) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const whereClause = {};
    if (email) whereClause.email = email;
    if (apiKey) whereClause.apiKey = apiKey;

    const uniqueCheck = await prisma.user.findFirst({
      where: whereClause,
    });

    if (uniqueCheck) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        apiKey,
        appId,
      },
    });
    res.json({
      message: "Successfully update user",
      data: user,
    });
  },
  postUsers: async (req, res) => {
    const { email, apiKey, appId = "1" } = req.body;

    const checkUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { apiKey }],
      },
    });

    if (checkUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await prisma.user.create({
      data: {
        email,
        apiKey,
        appId,
      },
    });
    res.status(201).json({
      message: "Successfully create users",
      data: user,
    });
  },
};

module.exports = userController;
