function areAllFieldsFilled(req, res, next) {
    try {
        const {firstName, lastName, email, password, age, city} = req.body;

        if (!firstName) {
            throw new Error('First name is not provided');
        }
        if (!lastName) {
            throw new Error('Last name is not provided');
        }
        if (!email || !password) {
            throw new Error('Login or password is not provided!')
        }
        if (!age) {
            throw new Error('Age is not provided');
        }
        if (!city) {
            throw new Error('City is not provided');
        }

        next();
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = areAllFieldsFilled;
