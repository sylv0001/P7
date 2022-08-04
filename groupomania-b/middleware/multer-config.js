//Multer : Middleware to accept file upload
const multer = require('multer');

//Image file extensions
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// check if img directory exists
const fs = require('fs');
const dir = './img';
if (!fs.existsSync(dir)) {
  // create new directory
  fs.mkdir(dir, (err) => {
    if (err) {
      throw err;
    }
  });
}

//Storage hard-disk destination
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'img');
  },

  //Rename image file
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

//Export unique image with multer
module.exports = multer({ storage: storage }).single('image');