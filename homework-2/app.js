// декілька ендпоінтів зробити
//
// 1. /login, поля які треба відрендерити в файлі hbs: firstName, lastName, email(унікальне поле), password, age, city
// просто зробити темплейт з цим усім і вводити свої дані які будуть пушитися в масив і редірект робити на сторінку
// з усіма юзерами /users і перевірка чи такий імейл не існує, якщо існує то редірект на еррор пейдж
//
// 2. /users просто сторінка з усіма юзерами, але можна по квері параметрам їх фільтрувати по age і city
//
// 3. /user/:id сторінка з інфою про одного юзера
//
// 4. зробити якщо не відпрацюють ендпоінти то на сторінку notFound редірект

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

let users = [{
    id: 1,
    firstName: 'Natalya',
    lastName: 'Malitska',
    email: 'vns122716@gmail.com',
    password: '12345',
    age: 37,
    city: 'Lviv'
    },
    {
        id: 2,
        firstName: 'Oleg',
        lastName: 'Petrov',
        email: 'Oleg@gmail.com',
        password: '11111',
        age: 22,
        city: 'Kyiv'
    },
    {
        id: 3,
        firstName: 'Ira',
        lastName: 'Litna',
        email: 'ira@gmail.com',
        password: '22222',
        age: 35,
        city: 'Odessa'
    }];

let error = '';

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', ({body}, res) => {
    const userExist = users.some(user => user.email === body.email);
    if (userExist) {
        error = 'User with this email exist!';
        res.render('error', {error});
        return;
    }

    users.push({...body, id: users.length ? users[users.length - 1].id + 1 : 1});
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
        error = `User with ID: ${userId} no  exist!`;
        res.render('error', {error});
        return;
    }
    res.render('userDetails', {user});
});

app.use((req, res) => {
    res.render('notFound');
});

app.listen(5200, () => {
    console.log('Serves has started on PORT: http://localhost:5200');
});
