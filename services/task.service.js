const TaskRepository = require("../repositories/task.repository");
module.exports.addTask = async function(req, res) {
  res.send(
    await TaskRepository.addTask(
      req.body.name,
      req.body.description,
      req.body.date,
      req.user
    )
  );
};

module.exports.updateTaks = async function(req, res) {
  res.send(await TaskRepository.updateTaks(req.body.task));
};

module.exports.allUsersTasks = async function(req, res) {
  res.send(await TaskRepository.allUsersTasks(req.user));
};
module.exports.dateTasks = async function(req, res) {
  res.send(await TaskRepository.dateTasks(req.user, req.body.date));
};
