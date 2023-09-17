const express = require("express");
const router = express.Router();
const ctrlContact = require("../../controller");
const ctrlUser = require("../../controller/users");

router.get("/", ctrlUser.auth, ctrlContact.get);

router.get("/:contactId", ctrlUser.auth, ctrlContact.getById);

router.delete("/:contactId", ctrlUser.auth, ctrlContact.remove);

router.post("/", ctrlUser.auth, ctrlContact.create);

router.put("/:contactId", ctrlUser.auth, ctrlContact.update);

router.patch("/:contactId/favorite", ctrlUser.auth, ctrlContact.favorite);

module.exports = router;
