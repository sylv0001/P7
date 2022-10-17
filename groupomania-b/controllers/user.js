//Bcrypt : Algorythm to hash password
const bcrypt = require('bcrypt')
//JsonWebToken : Access token
const jwt = require('jsonwebtoken')
//Import model of user
const User = require('../schemas/User')
//Import secret key to crypt token
const dotEnv = require('dotenv').config();
//Import dependencie to secure password
const passwordValidator = require('password-validator');

//schema of secure password
const schema = new passwordValidator();
schema
  .has().min(8)                     // Minimum length 8
  .has().uppercase()                // Must have uppercase letters
  .has().lowercase()                // Must have lowercase letters
  .has().digits(1)                  // Must have at least 1 digits
  .has().not().spaces()             // Should not have spaces

//***********SIGNUP***********
exports.signup = (req, res, next) => {
  let pass = false
  let mail = false
  // Test if password is correct
  if (schema.validate(req.body.password)) {
    pass = true
  }
  //Test if email is correct
  if (/^(\w+?\w+\.)*(\w+){1}@(groupomania.fr)$/.test(req.body.email)) {
    mail = true
  }
  //If all are ok => send request
  if (pass && mail) {
    //Hash password
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        //Create user
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash
        });

        //Record user in DB
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }))
      })
      .catch(error => {
        res.status(500).json({ error })
      })
  }
  //If error on email => message error
  else if (!mail) {
    res.status(401).json({ message: 'Email Groupomania obligatoire !' })
  }
  //If error on password => message error
  else if (!pass) {
    res.status(401).json({ message: 'Respectez les prérequis du mot de passe !' })
  }

};

//***********LOGIN***********
exports.login = (req, res, next) => {
  //Find user
  User.findOne({ email: req.body.email })
    .then(user => {

      if (!user) {
        return res.sendStatus(404);
      }

      //Compare token to be sure if it is the good user login
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.sendStatus(401);
          }
          res.status(200).json({
            userId: user._id,
            isAdmin: user.admin,
            token: jwt.sign(
              { userId: user._id },
              //Get key used to crypt token
              `${process.env.MY_TOKEN}`,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//***********UPDATE PASSWORD***********
exports.updatepass = (req, res, next) => {
  //Find user
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }

      //Hash password
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          //Password updated 
          user.updateOne({ password: hash })
            .then(() => res.status(201).json({ message: 'Mot de passe modifié !' }))
            .catch(error => res.status(400).json({ error }))
        })
        .catch(error => {
          res.status(500).json({ error })
        })

    })
    .catch(error => res.status(500).json({ error }));
};

//***********DELETE USER***********
exports.delete = async (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Utilisateur supprimé !" });
    })
    .catch((err) => {
      res.status(500).json({ err });
    })
}