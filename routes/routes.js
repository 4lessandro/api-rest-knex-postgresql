const express = require('express')
const app = express();
const router = express.Router();

//Controllers
const HomeController = require('../controllers/HomeController');
const UserController = require('../controllers/UserController');

//GET
router.get('/', HomeController.index);
router.get('/user', UserController.index);
router.get('/user/:id', UserController.findById);

//POST
router.post('/user', UserController.create);
router.post('/recoverpassword', UserController.recoverPassword);
router.post('/changepassword', UserController.changePassword);
router.post('/login', UserController.login);

//PUT
router.put('/user', UserController.edit);

//DELETE
router.delete('/user/:id', UserController.remove);

module.exports = router;