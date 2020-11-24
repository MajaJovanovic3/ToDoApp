const mongoose = require("mongoose")
var TaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true},
    date: { type: Date, required: true },
    completed:{type:Boolean, default:false},
    userId:{ type: mongoose.Types.ObjectId, ref: 'User' }
});
var Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
