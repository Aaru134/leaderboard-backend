const express = require("express");
const router = express.Router();
const User = require("../models/User");
const ClaimHistory = require("../models/ClaimHistory");

router.post("/:userId", async (req, res) => {
    const { userId } = req.params;
    const randomPoints = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    user.totalPoints += randomPoints;
    await user.save();

    const history = new ClaimHistory({ userId, points: randomPoints });
    await history.save();

    res.json({ message: "Points claimed", user, randomPoints });
});

router.get("/leaderboard", async (req, res) => {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
});

router.get("/history", async (req, res) => {
    const history = await ClaimHistory.find().populate("userId");
    res.json(history);
});

module.exports = router;
