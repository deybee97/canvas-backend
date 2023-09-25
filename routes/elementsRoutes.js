const express = require("express")
const router = express.Router()
const  {createElement, deleteElement, modifyElement,changePosition, getElements} = require("../controllers/element")
const { uploadProductImageLocal, uploadProductImage } = require("../controllers/uploadController")


router.route('/').post(createElement).delete(deleteElement).get(getElements)
router.route('/settings').put(modifyElement)
router.route('/position').put(changePosition)
router.route('/uploads').post(uploadProductImage)

module.exports = router
