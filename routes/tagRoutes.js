const express = require("express")
const router = express.Router()
const tagController = require("../controllers/tagController")
const tagsCreateValidation = require("../validation/tagsCreateValidation")

const {checkSchema} = require("express-validator")



router.post("/",checkSchema(tagsCreateValidation), tagController.store )
module.exports = router