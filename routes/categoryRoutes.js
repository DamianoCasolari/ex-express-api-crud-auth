const  express = require("express")
const router = express.Router()
const categoryController = require("../controllers/categoryController")
const CategoriesCreateValidation = require("../validation/CategoriesCreateValidation")
const { body, checkSchema} = require("express-validator")


router.get("/",categoryController.index)
router.post("/",checkSchema(CategoriesCreateValidation),categoryController.store)


module.exports = router