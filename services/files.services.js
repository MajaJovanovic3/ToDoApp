const FilesRepository = require("../repositories/files.repository");

module.exports.uploadFile = async function(req, res) {
  res.status(200).send(await FilesRepository.uploadFile(req, res, req.user));
};
