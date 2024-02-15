const router = require("express").Router();
const commentController = require("../controller/commentController")

router.post("/create", commentController.createComment);
router.get("/all/:postId", commentController.getComments);

module.exports = router;