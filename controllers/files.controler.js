const FilesService = require("../services/files.services");
module.exports.uploadFile = async function(req, res) {
  res.send(await FilesService.uploadFile(req, res));
};
