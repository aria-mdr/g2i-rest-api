import express = require("express");
import { dummyLogger, Logger } from "ts-log";

const app: any  = express();
const port: number = 8181;

const log: Logger = dummyLogger



app.get( "/", ( req: any, res: { send: (arg0: string) => void; } ) => {
    const a = res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    log.info( `server started at http://localhost:${ port }` );
} );

// import express = require('express');

// // Create a new express application instance
// const app: express.Application = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });