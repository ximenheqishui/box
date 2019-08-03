var express = require('express');
var router = express.Router();
const mysql = require("../util/db-util")

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'admin'})
});

router.use('/common', require('./common/routes'))


module.exports = router;
