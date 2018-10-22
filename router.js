const Authentication = require('./controllers/authentication');

//setting up easy to read controllers for the listeners
module.exports = function (app) {
  app.post('/signup', Authentication.signup)
};
