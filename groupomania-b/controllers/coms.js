//////////////////////////Comments/////////////////////////////

// Import model of coms
const Com = require('../schemas/Com');

//Create Comment
exports.createCom = (req, res, next) => {
  //Get all input in body 
  const comObject = req.body;

  const com = new Com({
    ...comObject,
    userId: req.auth.userId,
    imageUrl: req.fil ? `${req.protocol}://${req.get('host')}/img/${req.file.filename}` : '',
  });
  
  //Record Comments in DB
  com.save()
    .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

//Screen All Comments
exports.getAllCom = (req, res, next) => {
  
  //Find all Comments to screen
  Com.find().find().populate('userId', 'name').then(
    (coms) => {
      res.status(200).json(coms);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
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
  
  //Find one select Comment
  Com.findOne({ _id: req.params.id }).then(
    (com) => {
      if (!com) {
        res.status(404).json({
          error: new Error('No such Comment!')
        });
      }
      if (com.userId !== req.auth.userId) {
        res.status(400).json({
          error: new Error('Unauthorized request!')
        });
      }
      
      //Delete comment if exist just by creator user
      Com.deleteOne({ _id: req.params.id }).then(
        () => {
          res.status(200).json({
            message: 'Commentaire effacé!'
          });

          //Delete file from hard-disk
          const path = com.imageUrl.split('http://localhost:3000/')
          const fs = require('fs')
          fs.unlink(path[1], (err) => {
            if (err) {
              console.error(err)
              return
            }
          })
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    }
  )
};

//Modify One Comment
exports.modifyCom = (req, res, next) => {
 
  // if change image
  if (req.file) {
    
    //Delete Old File on hard-disk
    Com.findOne({ _id: req.params.id }).then(
      (com) => {
        const path = com.imageUrl.split('http://localhost:3000/')
        const fs = require('fs')
        fs.unlink(path[1], (err) => {
          if (err) {
            console.error(err)
            return
          }
        })
      }
    );
    
    //Update image
    const parse = JSON.parse(req.body.com)
    Com.updateOne({ _id: req.params.id }, { ...parse, imageUrl: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`, _id: req.params.id })
      .then(
        () => {
          res.status(201).json({
            message: 'Commentaire modifié!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
  }
  
  // if not change image
  else {
    Com.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(
        () => {
          res.status(201).json({
            message: 'Commentaire modifié!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
  }

};

//////////////////////////Likes and Dislikes///////////////////////////

exports.likeCom = (req, res, next) => {

  ////////////If user add "like" to "like"////////////
  if (req.body.like === 1) {
    Com.findOne({ _id: req.params.id }).then(
      (com) => {
        const numLikes = com.likes+1;
        //Looking for if user is or not in array "usersLiked"
        //If he's not in : we incremente "Like" and add user in the array "usersLiked"
        if (!com.usersLiked.includes(req.body.userId)) {
          Com.updateOne({ _id: req.params.id }, { $inc: { likes: +1 }, $push: { usersLiked: req.body.userId } }
          )
            .then(() => res.status(200).json({ numLikes }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
  }

  ////////////If user add "like" to "dislike"////////////
  if (req.body.like === -1) {
    Com.findOne({ _id: req.params.id }).then(
      (com) => {
        //Looking for if user is or not in array "usersDisliked"
        //If he's not in : we incremente "Dislike" and we add user in the array "usersDisliked"
        if (!com.usersDisliked.includes(req.body.userId)) {
          Com.updateOne({ _id: req.params.id }, { $inc: { dislikes: +1 }, $push: { usersDisliked: req.body.userId } }
          )
            .then(() => res.status(200).json({ message: "Dislike Ok!" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
  }

  ////////////If user "like" to delete his "like" or his "dislike"////////////
  if (req.body.like === 0) {
    Com.findOne({ _id: req.params.id }).then(
      (com) => {
        //If user is in array usersLiked : we decremente "Like" and delete user in the array "usersLiked"
        if (com.usersLiked.includes(req.body.userId)) {
          Com.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
          )
            .then(() => res.status(200).json({ message: "Delete like Ok!" }))
            .catch((error) => res.status(400).json({ error }));
        }

        //If user is in array usersDisliked : we decremente "Dislike" and delete user in the array "usersLiked"
        if (com.usersDisliked.includes(req.body.userId)) {
          Com.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
          )
            .then(() => res.status(200).json({ message: "Delete dislike Ok !" }))
            .catch((error) => res.status(400).json({ error }));
        }

      })
  }

}