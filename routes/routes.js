const express = require('express')
const app = express();
const router = express.Router();

//Controllers
const HomeController = require('../controllers/HomeController');
const UserController = require('../controllers/UserController');

//Middlewares
const AdminAuth = require('../middlewares/AdminAuth');

//GET
router.get('/', HomeController.index);
router.get('/user', AdminAuth, UserController.index);
router.get('/user/:id', UserController.findById);

//POST
router.post('/user', AdminAuth, UserController.create);
router.post('/recoverpassword', UserController.recoverPassword);
router.post('/changepassword', UserController.changePassword);
router.post('/login', UserController.login);
router.post('/validate', AdminAuth, HomeController.validate);

//PUT
router.put('/user', AdminAuth, UserController.edit);

//DELETE
router.delete('/user/:id', AdminAuth, UserController.remove);

module.exports = router;