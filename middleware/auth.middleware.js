const prisma = require("../db/prisma");

const authMiddleware = async(req, res, next) => {
    const apiKey = req.header('X-API-Key');
    
    if (!apiKey) {
        return res.status(401).json({ message: 'API key is missing' });
    }
    
    // Validate the API key against the database
    const user = await prisma.user.findUnique({
        where: { apiKey: apiKey }
    });

    if (!user) {
        return res.status(401).json({ message: 'Invalid API key' });
    }

    // /users route only allow for appId 0, /deals POST only allow for appId 0, /deals GET allowed for appId 0 and 1
    if (req.baseUrl.includes('/users') && user.appId !== 0) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    if (req.baseUrl.includes('/deals') && req.method === 'POST' && user.appId !== 0) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    

    req.user = user;
    
    req.apiKey = apiKey;
    next();
}

module.exports = authMiddleware;