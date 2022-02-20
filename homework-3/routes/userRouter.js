const {Router} = require('express');
const userRouter = Router();

const userController = require('../controllers/userController');

userRouter.get('/', userController.filterUsersByCityAndAge);
userRouter.get('/:userId', userController.getUserById);
userRouter.post('/:userId', userController.postUserById);

module.exports = userRouter;