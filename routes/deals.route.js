const express = require('express');
const router = express.Router();
const dealsController = require('../controllers/deals.controller');

router.get('/', dealsController.getDeals);
router.post('/', dealsController.postDeals);

module.exports = router;
