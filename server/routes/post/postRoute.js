
const router = require("express").Router();
const postController = require("../../controller/post/postController")

router.post("/create", postController.createPost);
router.get("/", postController.getRecentPost);

module.exports = router;