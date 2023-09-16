const express = require("express");
const router = express.Router();
const ctrlUser = require("../../controller/users");

router.post("/signup", ctrlUser.signup);

router.post("/login", ctrlUser.login);

router.get("/logout", ctrlUser.auth, ctrlUser.logout);

// router.get("/current", ctrlUser.auth, ctrlUser.current);

module.exports = router;
