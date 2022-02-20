const path = require('path');
const express = require('express');
const app = express();
const {engine} = require('express-handlebars');

const apiRoutes = require('./routes/apiRoutes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

app.use(apiRoutes);

app.listen(5200, () => {
    console.log('Serves has started on PORT: http://localhost:5200');
});