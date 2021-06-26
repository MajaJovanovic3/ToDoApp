const router = require("express").Router();
const UserController = require("./controllers/user.controller");
const TaskController = require("./controllers/task.controller");
const FilesController = require("./controllers/files.controler");
const AuthMiddleware = require("./middleware/auth.middleware");

router.post("/register-user", UserController.registerUser);
router.post("/login-user", UserController.loginUser);
router.post("/add-task", AuthMiddleware.verify, TaskController.addTask);
router.post(
  "/all-users-tasks",
  AuthMiddleware.verify,
  TaskController.allUsersTasks
);
router.post("/date-tasks", AuthMiddleware.verify, TaskController.dateTasks);
router.post("/update-task", AuthMiddleware.verify, TaskController.updateTaks);
router.post("/upload-files", AuthMiddleware.verify, FilesController.uploadFile);
router.post(
  "/change-password",
  AuthMiddleware.verify,
  UserController.changePasswordUser
);
router.post("/delete-task", AuthMiddleware.verify, TaskController.deleteTask);
module.exports = router;
