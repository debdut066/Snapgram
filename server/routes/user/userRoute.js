const router = require("express").Router();
const userController = require("../../controller/user/userController")

router.get("/saved", userController.savedPosts);
router.get("/:id", userController.userProfile);
router.put("/update/:id", userController.updateProfile);
router.get("/search/:seachTerm", userController.searchUsers);

module.exports = router;
