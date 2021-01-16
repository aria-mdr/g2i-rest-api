import express = require("express");
import bodyParser from "body-parser"
import { dummyLogger, Logger } from "ts-log";

const app: any  = express();
const port: number = 8181;

const log: Logger = dummyLogger

app.use(bodyParser.json())

app.get( "/", ( req: any, res: { send: (arg0: string) => void; } ) => {
    const a = res.send( "Hello world! test" );
    log.info(a);
} );

app.get( "/app", ( req: any, res: { send: (arg0: string) => void; } ) => {
    const a = res.send( "test" );
    log.info(a);
} );

// start the Express server
app.listen( port, () => {
    log.info( `server started at http://localhost:${ port }` );
} );

export default app;