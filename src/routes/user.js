const express = require("exporess")
const router = express.router()

router.route('/').post(createUser)


module.exports = router