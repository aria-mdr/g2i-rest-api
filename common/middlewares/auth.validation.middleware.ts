import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import config from "../config/env.config"
export default {
    verifyRefreshBodyField: (req: any, res: any, next: CallableFunction) => {
        if (req.body && req.body.refresh_token) {
            return next();
        } else {
            return res.status(400).send({ error: 'need to pass refresh_token field' });
        }
    },

    validRefreshNeeded: (req: any, res: any, next: CallableFunction) => {
        let b = Buffer.from(req.body.refresh_token, 'base64');
        let refresh_token = b.toString();
        let hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(config.jwt_secret).digest("base64");
        if (hash === refresh_token) {
            req.body = req.jwt;
            return next();
        } else {
            return res.status(400).send({ error: 'Invalid refresh token' });
        }
    },

    validJWTNeeded: (req: any, res: any, next: CallableFunction) => {
        if (req.headers['authorization']) {
            try {
                let authorization = req.headers['authorization']
                req.jwt = jwt.verify(authorization, config.jwt_secret);
                return next();
            } catch (err) {
                return res.status(403).send();
            }
        } else {
            return res.status(401).send();
        }
    }
}




