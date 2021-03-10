const TaskService = require('../services/task.service');
module.exports.addTask = async function (req,res) {
    res.send(await TaskService.addTask(req,res))
}

module.exports.updateTaks = async function (req,res) {
    res.send(await TaskService.updateTaks(req,res))
}

module.exports.allUsersTasks = async function (req,res) {
    res.send(await TaskService.allUsersTasks(req,res))
}
module.exports.dateTasks = async function (req,res) {
    res.send(await TaskService.dateTasks(req,res))
}