let users = require("../db/users");
let error = '';

class LoginController {

    loginUsers(req, res) {
        res.render('login');
    }

    renderUsers({body}, res) {
        const userExist = users.some(user => user.email === body.email);
        if (userExist) {
            error = 'User with this email exist!';
            res.redirect('/error');
            return;
        }

        users.push({...body, id: users.length ? users[users.length - 1].id + 1 : 1});
        res.redirect('/users');
    }
}

module.exports = new LoginController();

