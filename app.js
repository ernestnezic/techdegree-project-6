const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

const routes = require('./routes');
app.use(routes);


app.use((req, res, next) => {
    const err = new Error('Not found!')
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err)
});


app.listen(3000, () => {
    console.log('The App is running on localhost:3000');
})