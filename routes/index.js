const express = require('express');
const router = express.Router();

const { projects }  = require('../data.json');


router.get('/', (req, res) => {
    res.render('index', { projects });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/project/:id', (req, res) => {
    const projectId = req.params.id;
    if ( projectId >= 0 && projectId <= projects.length) {
        res.render('project', {project : projects[projectId]});
    } else {
        const err = new Error();
        err.status = 404;
        err.message = '404 - Page Not Found!'
        res.render('page-404', { status : err.message })
    }
    
    
});


module.exports = router;