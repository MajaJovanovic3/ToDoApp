const app=require("./app")
const port = process.env.PORT || 3001;
const mongoose = require("mongoose")
var mongoDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1/ToDoApp';
mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
  app.listen(port, () => console.log('App is listening on port ' + port));
  