const axios = require("axios");

async function getFood(req, res, next) {

    try {

        const access = req.access;

        const response = await axios.post('https://platform.fatsecret.com/rest/server.api', {
            method: 'foods.search',
            search_expression: 'toast',
          }, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${access}`
            }
          }
        )

        console.log(response)

        // POST https://platform.fatsecret.com/rest/server.api
        // Content-Type: application/json
        // Header: Authorization: Bearer <Access Token>
        // Parameters: method=foods.search&search_expression=toast&format=json
      
        res
        .status(200)
        .json({ response });
    } catch(error) {
        next(error);
    }

};

module.exports = { getFood };