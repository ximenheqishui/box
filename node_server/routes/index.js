var express = require('express');
var router = express.Router();
const mysql = require("../util/db-util")

/* GET home page. */
router.get('/', function (req, res, next) {
    mysql.findDataById('user',1).then(function(rows){
        res.render('index', {title: rows[0].name});
    }).catch(function(err){
        res.render('index', {title: JSON.stringify(err)});
    })
});

module.exports = router;
