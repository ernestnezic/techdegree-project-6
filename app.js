//Requiering Express Framework and using it in the app
const express = require( 'express' );
const app = express();


//Setting the markup language( view engine ) to Pug
app.set( 'view engine', 'pug' );


//Declaring the static assets (CSS, images...)
app.use( '/static', express.static( 'public' ) );


//Including routes file in main app.js file
const routes = require( './routes' );
app.use( routes );

//Middleware function to handle the 404 Errors outside the 'project' route
app.use( ( req, res, next ) => {
    const err = new Error( 'Not found!' );
    err.status = 404;
    next( err );
} );

//Middleware function to handle all errors coused during the apps running
app.use( ( err, req, res, next ) => {
    
    //Handling 404 - Not Found errors
    if ( err.status === 404 ) {
        err.message = 'Page Not Found!';
        console.log( `${ err.status } - ${ err.message }` );
        res.render( 'page-not-found', { status: err } );
    } else {
        //Handling server errors
        err.message = ':( Looks like something went wrong on the Server, please try reloading the page!';
        err.status = 500;
        res.status( err.status );
        res.render( 'error', err );
    }
     
} );

//Adding listening port through which we can launch the app
app.listen( 3000, () => {
    console.log( 'The App is running on localhost:3000' );
} );