const express = require('express')
const ingredientsController = require("../../controllers/ingredients");
const fatSecretAuth = require("../../middlewares/fatSecretAuth")

const router = express.Router()
const jsonParser = express.json();

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post("/food", jsonParser, fatSecretAuth, ingredientsController.getFood);

module.exports = router
