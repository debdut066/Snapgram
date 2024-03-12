const router = require("express").Router();
const commentController = require("../../controller/comment/commentController")

router.post("/create", commentController.createComment);
router.get("/:id", commentController.getComments);
router.put("/like/:id", commentController.likeComment);
router.put("/delete/:id", commentController.deleteComment);

module.exports = router;