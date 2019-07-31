let express = require('express');
let router = express.Router();
const test = require('./../controllers/test')

router.get( '/test', test.indexPage )
router.get( '/test2', test.indexPage2 )
router.get( '/react-test', test.indexPage3 )

module.exports = router;
