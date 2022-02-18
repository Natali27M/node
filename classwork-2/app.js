// Необхідно розширити ваше ДЗ:
//     - додайте ендпоінт signIn який буде приймати email і password і якщо все вірно то редірект на сторінку цього юзера
//
// * хто хоче складніше реалізуйте видалення користувача. Кнопка повинна знаходитись на сторінці з інфою про одного
// юзера. Після видалення редірект на "/users"

const path = require('path');
const express = require('express');
const app = express();
const {engine} = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

let users = [{id: 1, firstName: 'Natalya', lastName: 'Malitska', email: 'xxx', password: '111', age: 38, city: 'Lviv'}];
let error = '';

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const userAudit = users.some(user => user.email === req.body.email);

    if (userAudit) {
        error = 'User with this email exist!';
        res.redirect('/error');
        return;
    }

    users.push({...req.body, id: users.length ? users[users.length - 1].id + 1 : 1});
    // users.push({...req.body, id: users.length ? users[users.length].id : 1});
    res.redirect('/users');
});

app.get('/users', ({query}, res) => {
    if (Object.keys(query).length) {
        let usersArray = [...users];
        if (query.city) {
            usersArray = usersArray.filter(user => user.city === query.city);
        }
        if (query.age) {
            usersArray = usersArray.filter(user => user.age === query.age);
        }

        res.render('users', {users: usersArray});
        return;
    }

    res.render('users', {users});
});

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;

    const user = users.find(user => user.id === +userId);
    if (!user) {
        error = `User with ID: ${userId} no exist!`;
        res.render('error', {error});
        return;
    }

    res.render('userDetails', {user});
});

// app.post('/users/:userId', (req, res) => {
//     users = users.filter(user => user.id !== +req.params.id);
//
//     res.redirect('/users');
// });
//
// app.get('/singIn', (req, res) => {
//     res.render('singIn');
// });
//
// app.post('/singIn', (req, res) => {
//     const userEmailPassword = users.find(user => user.email ===req. body.email && user.password === req.body.password);
//     if (userEmailPassword) {
//         res.redirect(`/users/${userEmailPassword.id}`);
//     }
// });

app.use((req, res) => {
    res.render('notFound');
});

app.listen(5200, () => {
    console.log('Serves has started on PORT: http://localhost:5200');
});
