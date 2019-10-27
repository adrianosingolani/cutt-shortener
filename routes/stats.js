const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const auth = require('../middleware/auth');

const Click = require('../models/Click');

router.get('/', auth, (req, res) => {
    Click.aggregate([
        {
            $match: {
                userId: mongoose.Types.ObjectId(req.user.id)
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                clicks: { $sum: 1 }
            }
        },
        {
            $addFields: { date: "$_id" }
        },
        {
            $project: { _id: 0 }
        }
    ])
        .then(stats => {
            res.json(stats);
        })
})

module.exports = router;