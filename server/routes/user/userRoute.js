const router = require("express").Router();
const userController = require("../../controller/user/userController")

router.get("/:id", userController.userProfile);

module.exports = router;
