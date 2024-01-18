const router = require("express").Router();
const userController = require("../../controller/user/userController")

router.get("/:id", userController.userProfile);
router.put("/update/:id", userController.updateProfile)
router.get("/saved", ()=>{
    console.log("saved")
});

module.exports = router;
