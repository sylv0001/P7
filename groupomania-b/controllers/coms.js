//////////////////////////Comments/////////////////////////////

// Import model of coms
const Com = require('../schemas/Com');
const User = require('../schemas/User')

//Create Comment
exports.createCom = (req, res, next) => {
  //Get all input in body 
  const comObject = req.body;
  const com = new Com({
    ...comObject,
    userId: req.auth.userId,
    user: req.auth.userId,
    imageUrl: req.file ? `${req.protocol}://${req.get('host')}/img/${req.file.filename}` : '',
  });

  //Record Comments in DB
  com.save()
    .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

//Screen All Comments
exports.getAllCom = (req, res, next) => {

  //Find all Comments to screen
  Com.find().populate('user', 'name').then(
    (coms) => {
      res.status(200).json(coms);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    }
    );
};

//Screen One Comment
exports.getOneCom = (req, res, next) => {

  //Find one select Comment 
  Com.findOne({
    _id: req.params.id
  }).then(
    (com) => {
      res.status(200).json(com);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

//Delete One Comment
exports.deleteCom = (req, res, next) => {

  //Find comment
  Com.findOne({ _id: req.params.id })
    .then((com) => {
      // if no comment exist
      if (!com) {
        res.status(404).json({
          error: 'No such Comment!'
        });
      }

      //Find user logged
      User.findOne({ _id: req.auth.userId })
        .then((user) => {
          //If user logged is the creator of the post OR admin
          if (com.userId != null && com.userId.toString() === req.auth.userId || user.admin === true) {
            //if image exist    
            if (com.imageUrl != null && com.imageUrl !== '') {
              // if (com.imageUrl !== '' || com.image !== null) {
              const path = com.imageUrl.split('http://localhost:3000/')
              const fs = require('fs')
              //Delete image on backend folder
              fs.unlink(path[1], () => {
                Com.deleteOne({ _id: req.params.id })
                  .then(() => {
                    res.status(200).json({ message: 'Commentaire supprimé !' })
                  })
                  .catch((error) => {
                    res.status(400).json({ error: error });
                  }
                  );
              })
            }

            //if image not exist
            else {
              Com.deleteOne({ _id: req.params.id })
                .then(() => {
                  res.status(200).json({ message: 'Commentaire supprimé !' })
                })
                .catch((error) => {
                  res.status(400).json({ error: error });
                }
                );
            }
          }

          //if user is not the creator of comment or not admin
          else {
            res.status(403).json({
              error: 'Unauthorized request!'
            });
          }
        }
        )
    })
};

//Modify One Comment
exports.modifyCom = (req, res, next) => {
  Com.findOne({ _id: req.params.id })
    .then((com) => {
      User.findOne({ _id: req.auth.userId })
        .then((user) => {
          if (com.userId != null && com.userId.toString() === req.auth.userId || user.admin === true) {

            //Delete Old File on hard-disk
            if (req.file) {
              if (com.imageUrl !== '' && com.image !== null) {
                const path = com.imageUrl.split('http://localhost:3000/')
                const fs = require('fs')

                fs.unlink(path[1], (err) => {
                  if (err) {
                    console.error(err)
                    return
                  }
                })
              }
              //Update image
              Com.updateOne({ _id: req.params.id }, req.body ? { ...req.body, imageUrl: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`, _id: req.params.id } : { imageUrl: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`, _id: req.params.id })
                .then(() => {
                  Com.findOne({
                    _id: req.params.id
                  })
                    .then((com) => {
                      res.status(201).json({
                        com
                      });
                    }
                    )
                }
                )
                .catch((error) => {
                  res.status(400).json({
                    error: error
                  })
                }
                )
            }

            // if not change image
            else {
              Com.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
                .then(() => {
                  Com.findOne({
                    _id: req.params.id
                  }).then((com) => {
                    res.status(201).json({
                      com
                    });
                  }
                  )
                }
                )
                .catch(
                  (error) => {
                    res.status(400).json({
                      error: error
                    });
                  }
                )
            }
          }

          else {
            res.status(403).json({
              error: 'Unauthorized request!'
            })
          }
        })
    })
};

//delete image
exports.delImage = (req, res, next) => {
  Com.findOne({ _id: req.params.id })
    .then((com) => {
      //Delete File on hard-disk
      const path = com.imageUrl.split('http://localhost:3000/')
      const fs = require('fs')
      fs.unlink(path[1], (err) => {
        if (err) {
          console.error(err)
          return
        }
      })

      //Update com without imageUrl (null)
      Com.updateOne({ _id: req.params.id }, { imageUrl: '', _id: req.params.id })
        .then(() => {
          Com.findOne({
            _id: req.params.id
          }).then((com) => {
            res.status(201).json({ com });
          }
          )
        }
        )
        .catch((error) => {
          res.status(400).json({ error: error })
        }
        )
    })
}
//////////////////////////Likes and Dislikes///////////////////////////

exports.likeCom = (req, res, next) => {

  ////////////If user add "like" to like or delete his like////////////
  if (req.body.like === 1) {
    Com.findOne({ _id: req.params.id }).then(
      (com) => {
        if (!com.usersDisliked.includes(req.body.userId)) { // To allow just the "like" or "dislike" but not both
          let numLikes = com.likes + 1;
          //If user isn't in array "usersLiked", I incremente "Like" and add user in the array "usersLiked"
          if (!com.usersLiked.includes(req.body.userId)) {
            Com.updateOne({ _id: req.params.id }, { $inc: { likes: +1 }, $push: { usersLiked: req.body.userId } }
            )
              .then(() => res.status(200).json({ numLikes }))
              .catch((error) => res.status(400).json({ error }));
          }
          else {
            //If user is in array usersLiked, I decremente "Like" and delete user in the array "usersLiked"
            let numLikes = com.likes - 1;
            Com.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
            )
              .then(() => res.status(200).json({ numLikes }))
              .catch((error) => res.status(400).json({ error }));
          }
        }
      })
  }

  ////////////If user add "like" to dislike or delete his dislike////////////
  if (req.body.like === -1) {
    Com.findOne({ _id: req.params.id }).then(
      (com) => {
        if (!com.usersLiked.includes(req.body.userId)) { // To allow just the "like" or "dislike" but not both
          let numDislikes = com.dislikes + 1;
          //If user isn't in array "usersDisliked", I incremente "Dislike" and add user in the array "usersDisliked"
          if (!com.usersDisliked.includes(req.body.userId)) {
            Com.updateOne({ _id: req.params.id }, { $inc: { dislikes: +1 }, $push: { usersDisliked: req.body.userId } }
            )
              .then(() => res.status(200).json({ numDislikes }))
              .catch((error) => res.status(400).json({ error }));
          }
          else {
            //If user is in array usersDisliked, I decremente "Dislike" and delete user in the array "usersDisliked"
            let numDislikes = com.dislikes - 1;
            Com.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
            )
              .then(() => res.status(200).json({ numDislikes }))
              .catch((error) => res.status(400).json({ error }));
          }
        }
      })
  }
}
