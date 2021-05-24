const mongoose = require("mongoose");
const Portfolio = mongoose.model("Portfolio");
module.exports = {
  getPortfolios: async (req, res) => {
    //return res.json({ data: "separate route test" });
    const portfolios = await Portfolio.find({});
    return res.json(portfolios);
  },
  getPortfoliosById: async (req, res) => {
    try {
      const portfolios = await Portfolio.findById(req.params.id);
      return res.json(portfolios);
    } catch (e) {
      return res.status(422).send(e.message);
    }
  },
  createPortfolios: async (req, res) => {
    const data = req.body;
    const portfolio = new Portfolio(data);
    try {
      const newPortfolio = await portfolio.save();
      return res.json(newPortfolio);
    } catch (e) {
      return res.status(422).send(e.message);
    }
  }
};
