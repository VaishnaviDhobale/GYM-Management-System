const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // console.log(file.originalname)
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype ==  "image/jpeg" || 
      file.mimetype == "video/mp4" ||
      file.mimetype == "video/webm" ||
      file.mimetype == "video/quicktime" || 
      file.mimetype == "application/pdf"
    ) {
      callback(null, true);
    } else {
      console.log("only jpg and png file supported");
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2000,
  },
});

module.exports = upload;
