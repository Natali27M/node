let users = require("../db/users");
let error = '';

class UserController {

    filterUsersByCityAndAge({query}, res) {
        if (Object.keys(query).length) {

            let usersArray = [...users];

            if (query.city) {
                usersArray = usersArray.filter(user => user.city === query.city);
                console.log(usersArray);
            }

            if (query.age) {
                console.log(query.age);
                usersArray = usersArray.filter(user => user.age === +query.age);
                console.log(usersArray);
            }

            res.render('users', {users: usersArray});
            return;
        }

        res.render('users', {users});
    }

    getUserById(req, res) {
        const {userId} = req.params;
        const user = users.find(user => user.id === +userId);

        if (!user) {
            error = `User with ID: ${userId} no  exist!`;
            res.render('error', {error});
            return;
        }

        res.render('userDetails', {user});
    }

    postUserById({params}, res) {
        users = users.filter(user => user.id !== +params.userId);
        res.redirect('/users');
    }
}

module.exports = new UserController();