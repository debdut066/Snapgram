
const router = require("express").Router();
const postController = require("../../controller/post/postController")

router.post("/create", postController.createPost);
router.get("/", postController.getRecentPost);
router.get("/:id", postController.getPost);
router.put("/like/:id", postController.likePost);
router.put("/edit/:id", postController.editPost);
router.delete("/:id", postController.deletePost);
router.patch("/save/:id", postController.savePost);
router.get("/search/:searchTerm", postController.searchPost);

module.exports = router;