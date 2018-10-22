const User = require("../models/user");

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email|| !password) {
    return res.status(422).send({error:"You mut provide email and password"});
  }

  //see if a user with the give email exists
  User.findOne({ email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    //If a user with email does exist return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email in use" });
    }

    //If a user does not exist create and save a new user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      //Respond to request indicatiing the user was created
      res.json({success:true});
    });
  });
};
