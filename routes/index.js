//Requiring Express framework and using it in the app
const express = require( 'express' );
const router = express.Router();


//Requiring the data.json file containing all of the data for our project, getting its projects object in which an array of projects is stored
const { projects }  = require( '../data.json' );


//Setting the root route for the application
router.get( '/', ( req, res ) => {
    res.render( 'index', { projects } );
} );

//Setting the about route for the applicaiton
router.get( '/about', ( req, res ) => {
    res.render( 'about' );
} );

//Handling requests for specific projects routes
router.get( '/project/:id', ( req, res ) => {
    const projectId = req.params.id;
    if ( projectId >= 0 && projectId <= projects.length ) {
        res.render( 'project', { project : projects[projectId] });
    } else {
        //Handling wrong project requests with 404 - Not Found error
        const err = new Error();
        err.status = 404;
        err.message = 'Page Not Found!';
        res.render( 'page-not-found', { status : err });
    } 
} );


//Exporting the index.js file to be used in the main, app.js file
module.exports = router;