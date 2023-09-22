const express = require("express")
const router = express.Router()
const  {createProfile, deleteProfile, modifyProfile, getProfile} = require("../controllers/profile")
const { uploadProductImageLocal } = require("../controllers/uploadController")

router.route('/').post(createProfile).delete(deleteProfile).get(getProfile)
router.route('/settings').put(modifyProfile)
router.route('/uploads').post(uploadProductImageLocal)

module.exports = router