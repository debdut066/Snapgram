const router = require("express").Router();
const userController = require("../../controller/user/userController")

router.get("/saved", userController.savedPosts);
router.get("/:username", userController.userProfile);
router.put("/update/:id", userController.updateProfile);
router.get("/search/:searchTerm", userController.searchUsers);

module.exports = router;
