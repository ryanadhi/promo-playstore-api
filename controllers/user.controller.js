const prisma = require("../db/prisma");

const userController = {
  getUsers: async (req, res) => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        appId: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    }); 
    res.json({
      message: "Successfully get users",
      data: users,
    });
  },
  postUsers: async (req, res) => {
    const { email, apiKey, appId = "1" } = req.body;

    const checkUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { apiKey },
        ],
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
