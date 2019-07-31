let express = require('express');
let router = express.Router();
const home = require('./../controllers/canvas')

module.exports = router.get( '/', home.indexPage )

module.exports = router;
