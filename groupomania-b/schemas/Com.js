//Import tool to use MongoDB Database 
const mongoose = require('mongoose');

//Create forms of datas (comments) in database
const comSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  //userId: { type: String, required: true },
  title: { type: String, required: true },
  commentaire: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String], required: false},
  usersDisliked: { type: [String], required: false}
});
//Export model of comments
module.exports = mongoose.model('Com', comSchema);