const Task = require("../models/task.models");
const multer = require("multer");

module.exports.uploadFile = async function(req, res, user) {
  let file = req.body.file;
  var fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "files");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    }
  });
  let upload = multer({ storage: fileStorage }).single("myFile");
  try {
     upload(req, res,async (err) => {
          if (err) {
        console.log(err);
      } else {
      let task =await Task.findOneAndUpdate(
        {
          _id: req.body.taskId,
          userId: user._id
        },
        { $push: { files: req.file.filename } }
      ).exec();
         }
      });
      return {message:"File has been uploaded successfully!"}
  } catch (error) {
    console.log(error);
  }
};
