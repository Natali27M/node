const {Router} = require('express');
const signInRouter = Router();

const signInController = require('../controllers/signInController');
const isUserValid = require('../middleware/isUserValid');

signInRouter.get('/', signInController.renderSignIn);
signInRouter.post('/', isUserValid, signInController.findUserByEmailAndPassword);

module.exports = signInRouter;