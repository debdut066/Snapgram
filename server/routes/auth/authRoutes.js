const router = require('express').Router();

router.post("/login", (req, res, next) => {
    console.log("login")
});

router.post("/register", (req, res, next) => {
    console.log("register")
});

module.exports = router;