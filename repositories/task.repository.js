const Task = require('../models/task.models')
const User = require('../models/user.models')
module.exports.addTask = async function (name, description, date, user) {
    try {
        if (!name) return ({ message: 'Niste uneli ime' })
        else if (!description) return ({ message: 'Niste uneli opis zadaka' })
        else {
            await Task.findOneAndUpdate({ 'name': name, 'description': description, 'date': date ? date : Date.now(), 'completed': 'false', 'userId': user._id, }, { new: true }, { upsert: true }).exec();
            return ({ message: 'Uspesno sacuvano!', isSaved:true })
        }
    }
    catch (error) { console.log(error) }
}
module.exports.allUsersTasks = async function (user) {
    try {
        return await Task.find({'userId':user._id}).exec();
        }
    catch (error) { console.log(error) }
}
module.exports.dateTasks = async function (user,date) {
    try {
    let  parts =date.split('/');
    console.log(parts);
    
let mydate = new Date(parts[2], parts[1] - 1, parts[0]); 
let tomorrow = mydate.getDate()+1
let nextDay=new Date(parts[2], parts[1] - 1,tomorrow)
console.log(mydate);

console.log(nextDay);
    
        return await Task.find({'userId':user._id, 'date': { $gt: mydate.toISOString(), $lt: nextDay.toISOString()}}).exec();
        }
    catch (error) { console.log(error) }
}