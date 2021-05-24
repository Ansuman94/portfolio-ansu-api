const express = require("express");
const router = express.Router();
const portFoliosApis = require("../controllers/portfolios");

router.get("", portFoliosApis.getPortfolios);
router.post("", portFoliosApis.createPortfolios);
router.get("/:id", portFoliosApis.getPortfoliosById);

module.exports = router;
