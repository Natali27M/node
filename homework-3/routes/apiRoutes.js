const {Router} = require('express');
const routes = Router();

const userRouter = require('../routes/userRouter');
const loginRouter = require('../routes/loginRouter');
const signInRouter = require('../routes/signInRouter');

routes.use('/login', loginRouter);
routes.use('/users', userRouter);
routes.use('/signIn', signInRouter);

routes.use((req, res) => {
    res.render('notFound');
})

module.exports = routes;