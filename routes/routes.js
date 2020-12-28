var express = require('express')
var app = express();
var router = express.Router();

//Controllers
const HomeController = require('../controllers/HomeController');
const UserController = require('../controllers/UserController');

router.get('/', HomeController.index);
router.post('/user', UserController.create);

module.exports = router;