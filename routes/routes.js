const express = require('express')
const app = express();
const router = express.Router();

//Controllers
const HomeController = require('../controllers/HomeController');
const UserController = require('../controllers/UserController');
const User = require('../models/User');

router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.get('/user', UserController.index);
router.get('/user/:id', UserController.findById);
router.put('/user', UserController.edit);
router.delete('/user/:id', UserController.remove);
router.post('/recoverpassword', UserController.recoverPassword);

module.exports = router;