const users = require("../db/users");

function isUserValid(req, res, next) {
    try {
        const {email,password} = req.body;
        const userEmailPassword = users.find(user => user.email === email && user.password === password);

        if (userEmailPassword) {
            res.redirect(`/users/${userEmailPassword.id}`);
        }

        next();

    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = isUserValid;

