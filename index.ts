import config from './common/config/env.config';
import UsersRouter from './acronyms/routes.config';
import AuthorizationRouter from './authorization/routes.config';
import express from 'express';
import bodyParser from "body-parser"
import { dummyLogger, Logger } from "ts-log";

const app = express();
const log: Logger = dummyLogger

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());

AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);



app.listen(config.port, function () {
    log.info(`server started at http://localhost:${config.port}`);
});