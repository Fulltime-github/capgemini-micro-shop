import express from "express";
const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.use(express.static("./dist/src"));

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
