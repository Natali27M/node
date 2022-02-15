// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу, дані які ви отримали запишіть їх в інший
// файл, в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так

const fs = require('fs');
const path = require('path');
// const pathJoin = path.join(__dirname, 'main.txt');
// const pathJoin2 =path.join(__dirname, 'newMain', 'main.txt');

// fs.writeFile(path.join(pathJoin), 'SOME DATA', err => {
//     if (err) {
//         throw err;
//     }
//
//         fs.readFile(path.join(pathJoin), (err, data) => {
//             if (err) {
//                 throw err;
//             }
//
//             fs.writeFile(path.join(__dirname, 'main2.txt'), data, err => {
//                 if (err) {
//                     throw err;
//                 }
//             });
//         });
// });

// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній, старий файл видаліть після
// того як все завершиться. Також вийде callback hell

// const fs = require('fs');
// const path = require('path');
// const pathJoin = path.join(__dirname, 'task2.txt');
// const pathJoin2 = path.join(__dirname, 'task2', 'test.txt');
// const pathFolder = path.join(__dirname, 'task2');
//
// fs.writeFile(pathJoin, 'SOME DATA2222222222', err => {
//     if (err) {
//         throw err;
//     }
//
//     fs.readFile(pathJoin, (err, data) => {
//         if (err) {
//             throw err;
//         }
//
//         fs.mkdir(pathFolder, err => {
//             if (err) {
//                 throw err;
//             }
//             fs.writeFile(pathJoin2, data, err => {
//                 if (err) {
//                     throw err;
//                 }
//
//                 fs.unlink(pathJoin, err => {
//                     if (err) {
//                         throw err;
//                     }
//                 });
//             });
//         });
//     });
// });

// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані (можуть бути нові папки і файли
// (в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать - це файли тоді вам потрібно
// їх очистити, але не видаляти, якщо дані - це папки, вам потрібно їх перейменувати і додати до назви префікс _new

fs.mkdir(path.join(__dirname, 'task-3', 'public', 'files', 'test'), {recursive: true}, err => {
    if (err) {
        throw err;
    }

    fs.writeFile(path.join(__dirname, 'task-3', 'public', 'public.txt'), 'SOME DATA PUBLIC', err => {
        if (err) {
            throw err;
        }
    });

    fs.writeFile(path.join(__dirname, 'task-3', 'public', 'files', 'test', 'test.txt'), 'SOME DATA TEST', err => {
        if (err) {
            throw err;
        }
    });
});

fs.readdir(path.join(__dirname, 'task-3'), (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
})
