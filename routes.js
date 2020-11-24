const router = require("express").Router();
const UserController=require('./controllers/user.controller')
const TaskController=require('./controllers/task.controller')
const AuthMiddleware=require('./middleware/auth.middleware')

router.post('/register-user', UserController.registerUser)
router.post('/login-user', UserController.loginUser)
router.post('/add-task', AuthMiddleware.verify, TaskController.addTask)
router.post('/all-users-tasks', AuthMiddleware.verify, TaskController.allUsersTasks)
router.post('/date-tasks', AuthMiddleware.verify, TaskController.dateTasks)
module.exports=router