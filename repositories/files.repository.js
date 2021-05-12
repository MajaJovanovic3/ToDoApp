const Task = require("../models/task.models");
const multer = require("multer");

module.exports.uploadFile = async function(req, res, user) {
  var fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "files");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    }
  });
  let upload = multer({ storage: fileStorage }).single("myFile");
  let promise = new Promise((resolve, reject) => {
    upload(req, res, async err => {
      if (err) {
        console.log(err);
      } else {
        let task = await Task.findOneAndUpdate(
          {
            _id: req.body.taskId,
            userId: user._id
          },
          { $push: { files: req.file.filename } },
          { new: true }
        ).exec();
        if (task != null) resolve(task);
        console.log(task);
      }
    });
  }).catch(error => {
    console.log(error);
    throw error;
  });
  let task = await promise;
  if (task != null) {
    console.log(task);
    return {
      message: "File has been uploaded successfully!",
      task: task,
      status: "OK"
    };
  } else return { message: "An error has occurred!" };
};
