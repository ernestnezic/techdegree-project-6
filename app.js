const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

const routes = require('./routes');
app.use(routes);


app.use((req, res, next) => {
    const err = new Error('Not found!')
    err.status = 404;
    next(err)
});

app.use((err, req, res, next) => {
    
    if (err.status === 404) {
        err.message = '404 - Page Not Found!'
        res.render('page-404', { status : err.message })
    } else {
        err.message = ':( Looks like something went wrong on the Server, please try reloading the page!'
        err.status = 500;
        res.status(err.status);
        res.render('error', err)
    }
     
});


app.listen(3000, () => {
    console.log('The App is running on localhost:3000');
})