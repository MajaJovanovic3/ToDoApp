const Task = require("../models/task.models");

module.exports.addTask = async function(name, description, date, user) {
  try {
    console.log(date);
    let d = date.substring(0, 10);
    if (!name) return { message: "Niste uneli ime" };
    else if (!description) return { message: "Niste uneli opis zadaka" };
    else {
      let task = new Task({
        name: name,
        description: description,
        date: new Date(d),
        completed: "false",
        userId: user._id
      });
      let result = await task.save();
      return { message: "Successfully saved!", isSaved: true, task: result };
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.updateTaks = async function(task) {
  let d = task.date.substring(0, 10);
  try {
    let result = await Task.findByIdAndUpdate(
      { _id: task._id },
      {
        name: task.name,
        description: task.description,
        date: new Date(d),
        completed: task.completed != null ? task.completed : false
      },
      { new: true }
    );
    return { message: " Successfully changed!", isUpdated: true, task: result };
  } catch (error) {
    console.log(error);
  }
};

module.exports.allUsersTasks = async function(user) {
  try {
    return await Task.find({ userId: user._id }).exec();
  } catch (error) {
    console.log(error);
  }
};
module.exports.dateTasks = async function(user, date) {
  console.log(user);
  try {
    let d = date.substring(0, 10);
    let tasks = await Task.find({ userId: user._id, date: new Date(d) });
    return tasks;
  } catch (error) {
    console.log(error);
  }
};
module.exports.deleteTask = async function(id) {
  console.log(id);
  try {
    await Task.findByIdAndRemove(id);
    return { message: "Successfully deleted!", isDeleted: true };
  } catch (error) {
    return {
      message: "An error occured! Please, try again!",
      isDeleted: false
    };
    console.log(error);
  }
};
