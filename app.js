// Всі дії виконувати з допомогою модулів (вручну нічого не створюємо)

// Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson

const fs = require('fs');

const path = require("path");

// fs.mkdir(path.join(__dirname, 'main'),(err => {
//     if (err){
//         console.log(err);
//         throw err;
//     }
// }));
//
// fs.mkdir(path.join(__dirname, 'main','online'),(err => {
//     if (err){
//         console.log(err);
//         throw err;
//     }
// }));
//
// fs.mkdir(path.join(__dirname, 'main','inPerson'),(err => {
//     if (err){
//         console.log(err);
//         throw err;
//     }
// }));


// Потім створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами
// user ({. name: "Andrii", age: 22, city: "Lviv" }),  відповідно перший - onlineUsers, другий - inPersonUsers;

// fs.appendFile(path.join(__dirname, 'app.js'),
//     'const onlineUsers=[{name:"Andrii",age:22,city:"Lviv"},' +
//     '\n{name:"Igor",age:25,city:"Kyiv"},' +
//     '\n{name:"Oleg",age:32,city:"Odessa"}]\n' +
//     '\nconst inPersonUsers=[{name:"Victor",age:22,city:"Lviv"},' +
//     '\n{name:"Roman",age:25,city:"Kyiv"},' +
//     '\n{name:"Taras",age:32,city:"Odessa"}]',
//     (err => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//     }));

// і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів, але щоб ваш файл
// виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.


// const onlineUsers=[{name:"Andrii",age:22,city:"Lviv"},
//     {name:"Igor",age:25,city:"Kyiv"},
//     {name:"Oleg",age:32,city:"Odessa"}]
//
// const inPersonUsers=[{name:"Victor",age:22,city:"Lviv"},
//     {name:"Roman",age:25,city:"Kyiv"},
//     {name:"Taras",age:32,city:"Odessa"}]
//
// onlineUsers.forEach(user => {
//     const {name, age, city} = user;
//     fs.appendFile(path.join(__dirname, 'main', 'online', 'online.txt'),
//         `Name: ${name}\nAge:${age}\nCity:${city}\n\n`,
//         err => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//         });
// });
//
// inPersonUsers.forEach(user => {
//     const {name, age, city} = user;
//     fs.appendFile(path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'),
//         `Name: ${name}\nAge:${age}\nCity:${city}\n\n`,
//         err => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//         });
// });

// Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу.
// (ті, що були в папці inPerson будуть в папці online)

const onlinePath = path.join(__dirname, 'main', 'online');
const inPersonPath = path.join(__dirname, 'main', 'inPerson');

const moveData = () => {
    fs.readFile(path.join(inPersonPath, 'inPerson.txt'), (err, data) => {
        fs.readFile(path.join(onlinePath, 'online.txt'), (err2, data2) => {
            fs.writeFile(path.join(inPersonPath, 'inPerson.txt'), data2, () => {});
            fs.writeFile(path.join(onlinePath, 'online.txt'), data, () => {});

        });
    });
};

moveData();


