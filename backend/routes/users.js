var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');

router.get("/", usersController.find_all);


module.exports = router;
