//Bcrypt : Algorythm to hash password
const bcrypt = require('bcrypt')
//JsonWebToken : Access token
const jwt = require('jsonwebtoken')
//Import model of user
const User = require('../schemas/User')
//Import secret key to crypt token
const dotEnv = require('dotenv').config();

exports.signup = (req, res, next) => {
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
};

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