const express = require("express")
const router = express.Router()
const  {createProfile, deleteProfile, modifyProfile, getProfile} = require("../controllers/profile")
const { uploadProductImageLocal } = require("../controllers/uploadController")
const authenticate = require("../middleware/authentication")
router.get("/",getProfile)
router.use(authenticate)
router.route('/').post(createProfile).delete(deleteProfile)
router.route('/settings').put(modifyProfile)
router.route('/uploads').post(uploadProductImageLocal)


module.exports = router