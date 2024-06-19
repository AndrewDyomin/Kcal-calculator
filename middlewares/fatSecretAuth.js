require('dotenv').config();
const request = require("request");

function fatSecretAuth (req, res, next) {
   
   clientID = process.env.FAT_SECRET_CLIENT_ID
   clientSecret = process.env.FAT_SECRET_CLIENT_SECRET

   const options = {
      method: 'POST',
      url: 'https://oauth.fatsecret.com/connect/token',
      auth : {
         user : clientID,
         password : clientSecret
      },
      headers: { 'content-type': 'application/x-www-form-urlencoded'},
      form: {
         'grant_type': 'client_credentials',
         'scope' : 'basic'
      },
      json: true
   };

   request(options, function (error, response, body) {
      if (error) throw new Error(error);

      req.access = body.access_token

      next();
   });

}

module.exports = fatSecretAuth;