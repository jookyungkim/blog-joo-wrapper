const express = require("express");
const { Op } = require("sequelize");
const { Post, Image } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // GET /posts
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      // 보다 작은 거 10개 불러오기
      // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
      // Op.lt 이것보다 작은 의미
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await Post.findAll();

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;