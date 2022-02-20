let users = require("../db/users");

class SignInController {
    renderSignIn(req, res) {
        res.render('signIn');
    }

    findUserByEmailAndPassword({body}, res) {
        const user=users.map(user=>user)
            res.redirect(`/users/${user.id}`);
    }
}

module.exports = new SignInController();




