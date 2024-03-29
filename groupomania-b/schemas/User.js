//Import tool to use MongoDB Database
const mongoose = require('mongoose');
//Tool of mongoose to validate unique email in Database
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false }
});

userSchema.plugin(uniqueValidator);
//Export model of user
module.exports = mongoose.model('User', userSchema);