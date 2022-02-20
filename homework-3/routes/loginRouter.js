const {Router} = require('express');
const loginRouter = Router();

const loginController = require('../controllers/loginController');
const areAllFieldsFilled = require('../middleware/areAllFieldsFilled');

loginRouter.get('/', loginController.loginUsers);
loginRouter.post('/', areAllFieldsFilled, loginController.renderUsers);

module.exports = loginRouter;