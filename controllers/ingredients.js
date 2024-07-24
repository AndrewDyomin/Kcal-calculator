const axios = require("axios");
require('dotenv').config();
const deepl = require('deepl-node');

const authKey = process.env.DEEPL_API_KEY
const translator = new deepl.Translator(authKey);

const toEnglish = async (text) => {
    const result = await translator.translateText(text, null, 'en-US');
    return result.text
};

async function getFood(req, res, next) {

    try {
        const item = await toEnglish(req.body.item)
        console.log(item)
        const access = req.access;
        
        const response = await axios.post('https://platform.fatsecret.com/rest/server.api', {
            method: 'foods.search.v3',
            search_expression: item,
            format: "json",
          }, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${access}`
            }
          }
        )

        const data = response.data.foods_search.results.food
        const filteredData = data.filter((i) => i.food_name.toLowerCase() === item.toLowerCase())[0]
        const [ foodDetails ] = filteredData.servings.serving.filter(i => i.metric_serving_amount === "100.000")

        res
        .status(200)
        .send(foodDetails);
    } catch(error) {
        next(error);
    }

};

module.exports = { getFood };