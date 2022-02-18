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

// const path = require('path');
// const express = require('express');
// const app = express();
// const {engine} = require('express-handlebars');
//
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname, 'static')));
//
// app.set('view engine', '.hbs');
// app.engine('.hbs', engine({ defaultLayout: false }));
// app.set('views', path.join(__dirname, 'static'));
//
// let users = [{id: 1,firstName:'Natalya',lastName:'Malitska', email: 'vns122716@gmail.com', password: '12345',age:37,city:'Lviv'}]
// let error = '';
//
// app.get('/login', (req, res) => {
//     res.render('login');
// });
//
// app.post('/login', ({ body }, res) => {
//     const userExist = users.some(user => user.email === body.email);
//     if (userExist) {
//         error = 'User with this email exist!';
//         res.redirect('/error');
//         return;
//     }
//
//     users.push({ ...body, id: users.length ? users[users.length - 1].id + 1 : 1 });
//     res.redirect('/users');
// });
//
// app.get('/users', ({ query }, res) => {
//     if (Object.keys(query).length) {
//         let usersArray = [...users];
//         if (query.city) {
//             usersArray = usersArray.filter(user => user.city === query.city);
//         }
//         if (query.age) {
//             usersArray = usersArray.filter(user => user.age === query.age);
//         }
//
//         res.render('users', { users: usersArray });
//         return;
//     }
//
//     res.render('users', { users });
// });
//
// app.get('/users/:userId', (req, res) => {
//     const {userId} = req.params;
//
//     const user = users.find(user => user.id === +userId);
//     if (!user) {
//         error = `User with ID: ${userId} exist!`;
//         res.render('error', {error});
//         return;
//     }
//
//     res.render('userDetails', { user });
// });
//
// app.use((req,res)=>{
//     res.render('notFound');
// })
//
// app.listen(5200, () => {
//     console.log('Serves has started on PORT: http://localhost:5200');
// });

// Необхідно розширити ваше ДЗ:
//     - додайте ендпоінт signIn який буде приймати email і password і якщо все вірно то редірект на сторінку цього
//
// * хто хоче складніше реалізуйте видалення користувача. Кнопка повинна знаходитись на сторінці з інфою про одного
// юзера. Після видалення редірект на "/users"
//
const path = require('path');
const express = require('express');
const app = express();
const {engine} = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', engine({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

let users = [{id: 1, email: 'xxx', password: '111'}];
let error = '';

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', ({ body }, res) => {
    const userExist = users.some(user => user.email === body.email);
    if (userExist) {
        error = 'User with this email exist!';
        res.redirect('/error');
        return;
    }

    users.push({ ...body, id: users.length ? users[users.length - 1].id + 1 : 1 });
    res.redirect('/users');
});

app.get('/users', ({ query }, res) => {
    if (Object.keys(query).length) {
        let usersArray = [...users];
        if (query.city) {
            usersArray = usersArray.filter(user => user.city === query.city);
        }
        if (query.age) {
            usersArray = usersArray.filter(user => user.age === query.age);
        }

        res.render('users', { users: usersArray });
        return;
    }

    res.render('users', { users });
});

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;

    const user = users.find(user => user.id === +userId);
    if (!user) {
        console.log(user);
        error = `User with ID: ${userId} exist!`;
        res.render('error', {error});
        return;
    }
    res.render('userDetails', { user });
});

app.post('/users/:userId', ({params}, res) => {
    users = users.filter(user => user.id === +params.id);

    res.redirect('/users');
});

//     - додайте ендпоінт signIn який буде приймати email і password і якщо все вірно то редірект на сторінку цього
app.get('/singIn', (req, res) => {
    res.render('singIn');
});

app.post('/singIn', ({body}, res) => {
    // console.log(users, body);
    const userEmailPassword = users.find(user => user.email === body.email && user.password === body.password);
    if(userEmailPassword){
        res.redirect(`/user/${userEmailPassword.id}`);
    }
});

app.use((req, res) => {
    res.render('notFound');
});

app.listen(5200, () => {
    console.log('Serves has started on PORT: http://localhost:5200');
});
// * хто хоче складніше реалізуйте видалення користувача. Кнопка повинна знаходитись на сторінці з інфою про одного
// юзера. Після видалення редірект на "/users"