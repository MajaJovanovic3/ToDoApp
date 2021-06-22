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
  let upload = multer({ storage: fileStorage }).array("myFile", 5);
  let promise = new Promise((resolve, reject) => {
    upload(req, res, async err => {
      if (err) {
        console.log(err);
      } else {
         let task=null;
         let count=req.files.length;
        for(let i=0;i<req.files.length;i++){
         task =await Task.findOneAndUpdate(
          {
            _id: req.body.taskId,
            userId: user._id
          },
          { $push: { files: req.files[i].filename } },
          { new: true }
        ).exec();
        }
        let response={task:task, count:count}
        if (task != null) resolve(response);
      }
    });
  }).catch(error => {
    console.log(error);
    throw error;
  });
  let response = await promise;
  let message
  if(response.count>1 ) 
 message=response.count + " files have been uploaded successfully!" 
 else message=response.count + " file has been uploaded successfully!"
  if (response.task != null) {
    return {
      message: message,
      task: response.task,
      status: "OK"
    };
  } else return { message: "An error has occurred!" };
};
