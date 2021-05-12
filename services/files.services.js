const FilesRepository = require("../repositories/files.repository");
const Task = require("../models/task.models");
const path = require("path");

module.exports.uploadFile = async function(req, res) {
  console.log(req.body.taskId)
  return await FilesRepository.uploadFile(req, res, req.user);
};
